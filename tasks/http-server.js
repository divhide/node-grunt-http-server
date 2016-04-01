"use strict";

var _ = require('lodash'),
    Server = require('http-server'),
    opener = require("opener"),
    Divhide = require("divhide"),
    CustomPagesMiddleware = require("./libs/CustomPagesMiddleware");

/*
 * run an http server on grunt!

 Task:

 'http-server': {
     root: <path>,
     port: 8282,
     host: "127.0.0.1",
     cache: <sec>,
     showDir : true,
     autoIndex: true,
     ext: "html",
     runInBackground: true|false,
     cors: true,
     logFn: requestLogger,
     openBrowser : false

     https: {
         cert: "<file>",
         key:  "<file>"
     },

     // custom pages rules
     customPages: {
        "/" : "relativeFilePath.html"
     }

 }

 */

module.exports = function(grunt) {

    var requestLogger = function(req, res, error) {
        var date = (new Date).toUTCString();
        if (error) {
            console.log('[%s] "%s %s" Error (%s): "%s"', date, req.method.red, req.url.red, error.status.toString().red, error.message.red);
        } else {
            console.log('[%s] "%s %s" "%s"', date, req.method.cyan, req.url.cyan, req.headers['user-agent']);
        }
    };

    grunt.registerMultiTask(
        'http-server',
        function () {

            var done = this.async(),
                defaults = {
                    root: process.cwd(),
                    port: 8282,
                    host: "127.0.0.1",
                    cache: 20,
                    showDir : true,
                    autoIndex: true,
                    ext: "html",
                    runInBackground: false,
                    cors: false,
                    logFn: requestLogger,
                    https: false,
                    openBrowser : false,
                };

            var options = _.extend({}, defaults, this.data);
            options.port = typeof options.port === 'function' ? options.port() : options.port;

            // get the host to use on urls
            var urlHost = options.host != "0.0.0.0" ? options.host : "127.0.0.1";

            // initialize url string with default https protocol, no need for port here since using 443
            var url = "https://" + urlHost;

            // sanitize root
            options.root = options.root ? options.root : "./";

            /// default module https support
            if (options.https !== null && options.https === true){
                options.https = {
                    cert: __dirname + "/../files/cert.pem",
                    key:  __dirname + "/../files/key.pem"
                };
            }
            else if (options.https === null || options.https === false){
                // no https config, use regular protcol/host/port string
                url = "http://" + urlHost + ":" + options.port;
            }

            // setup middleware
            options.before = Divhide.Safe.array(options.before);
            options.before = options.before.concat([
                CustomPagesMiddleware(options.root, options.customPages)
            ]);

            // create http-server
            var server = Server.createServer(options);

            // start server
            server.listen(options.port, options.host, function() {

                var msgData = _.extend({}, options, {
                    protocol: !!options.https ? "https" : "http"
                });

                console.log(
                    _.template("Server running on <%= protocol %>://<%= host %>:<%= port %>/")(msgData));
                console.log('Hit CTRL-C to stop the server');

                if (options.openBrowser){

                    opener(url, {
                        command: options.openBrowser !== true ? options.openBrowser : null
                    });
                }

            });

            process.on('SIGINT', function () {
                console.log('http-server stopped');
                server.close();
                done();
                process.exit();
            });

            // async support - run in background
            if(options.runInBackground){
                done();
            }

        });

};
