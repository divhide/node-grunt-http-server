# grunt-http-server
> serve static files from a directory

> npm install grunt-http-server -l


## Getting Started

If you need to serve static files in your grunt directory you can add tasks with _grunt-http-server_.

Just add this task to Gruntfile:

```js

grunt.initConfig({

	'http-server':
		'dev' {
			{
				// the server root directory
				root: <path>,

				port: 8282,
				host: "127.0.0.1",

				cache: <sec>,
				showDir : true,
				autoIndex: true,
				defaultExt: "html",

				//wait or not for the process to finish
				runInBackground: true|false
			}
		}
});

grunt.loadNpmTasks('grunt-http-server');


```

And run:

```js


grunt http-server:dev

```

Now your static files are available in _http://127.0.0.1:8282/_ with nice generated pages to
easily browse content.


Blog Post:
http://blog.divhide.com/2013/07/grunt-http-server-npm-js-file-server-on.html

