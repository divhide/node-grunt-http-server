# grunt-http-server 
> use an http server with grunt....

> npm install grunt-http-server -l


## Getting Started

If you need to serve static files in your grunt directory you can add tasks with _grunt-http-server_.

Just add this task to Gruntfile:

```js

'http-server': 
	'dev' {
		{
			root: <path>,
			port: 8282,
	        host: "127.0.0.1",
			cache: <sec>,
			showDir : true,
			autoIndex: true,
			defaultExt: "html"
		}
	}

```

And run:

```js

grunt http-server:dev


```

Now your static files are available in _http://127.0.0.1:8282/_ with nice generated pages to 
easily browse content.



