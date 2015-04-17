"use strict";

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
		logFn: requestLogger
	}

 */

module.exports = function(grunt) {
	var Server = require('http-server'),
			_ = require('lodash');

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

		// grunt async task
		var done = this.async();

		var defaults = {
			root: process.cwd(),
			port: 8282,
			host: "127.0.0.1",
			cache: 20,
			showDir : true,
			autoIndex: true,
			ext: "html",
			runInBackground: false,
			cors: false,
			logFn: requestLogger 
		};

		var options = _.extend({}, defaults, this.data);
		options.port = typeof options.port === 'function'  ? options.port(): options.port;

		var server = Server.createServer(options);

		server.listen(options.port, options.host, function() {
			console.log("Server running on ", options.host + ":" + options.port);
			console.log('Hit CTRL-C to stop the server');
		});

		process.on('SIGINT', function () {
			console.log('http-server stopped');
			server.close();
			done();
			process.exit();
		});

		// async support - run in background
		if(options.runInBackground)
			done();
		});
}

