# [![Divhide](http://blog.divhide.com/assets/images/divhide_128px.png)](http://divhide.com/) grunt-http-server

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=NYVPSL7GBYD6A&lc=US&item_name=Oscar%20Brito&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)
[![Dependency Status](https://gemnasium.com/divhide/grunt-http-server.svg)](https://gemnasium.com/divhide/grunt-http-server)

[![NPM Stats](https://nodei.co/npm/grunt-http-server.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/grunt-http-server)

---

# Description

This grunt task provides you with an http server to serve your static files that you can
hook in your grunt build.

Full documentation and examples available on:
[divhide.com/node-grunt-http-server-1-x/](http://divhide.com/node-grunt-http-server-1-x/).

## Install

```js

npm install grunt-http-server

```

## Example

```js

grunt.initConfig({

    'http-server': {

        'dev': {

            // the server root directory
            root: <path>,

            // the server port
            // can also be written as a function, e.g.
            // port: function() { return 8282; }
            port: 8282,

            // the host ip address
            // If specified to, for example, "127.0.0.1" the server will
            // only be available on that ip.
            // Specify "0.0.0.0" to be available everywhere
            host: "0.0.0.0",

            cache: <sec>,
            showDir : true,
            autoIndex: true,

            // server default file extension
            ext: "html",

            // run in parallel with other tasks
            runInBackground: true|false,

            // specify a logger function. By default the requests are
            // sent to stdout.
            logFn: function(req, res, error) { },

            // Proxies all requests which can't be resolved locally to the given url
            // Note this this will disable 'showDir'
            proxy: "http://someurl.com",

            /// Use 'https: true' for default module SSL configuration
            /// (default state is disabled)
            https: {
                cert: "cert.pem",
                key : "key.pem"
            },

            // Tell grunt task to open the browser
            openBrowser : false,

            // customize url to serve specific pages
            customPages: {
                "/readme": "README.md",
                "/readme.html": "README.html"
            }

        }

    }
});

grunt.loadNpmTasks('grunt-http-server');

```

## Authors

+ [Oscar Brito](http://twitter.com/aetheon)

## License
Copyright (c) 2015 Oscar Brito <aetheon@gmail.com>, contributors.
Released under the MIT license

