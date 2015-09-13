
module.exports = function(grunt) {

  grunt.initConfig({

    'bump': require("./.grunt-tasks/bump"),

    'http-server': {

        'root': {
            root            : "",
            host            : "127.0.0.1",
            port            : function(){ return 8585; },
            https           : false
            //proxy           : "http://someurl.com"
        }

    }

  });

  // auto load tasks
  require('load-grunt-tasks')(grunt);

  // load libs
  grunt.loadTasks('./tasks/');

  grunt.registerTask(
    'default',
    [
        'http-server'
    ]);

};
