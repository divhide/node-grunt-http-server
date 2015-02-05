
module.exports = function(grunt) {

  grunt.initConfig({

    'http-server': {

        'root': {
            root            : "",
            host            : "127.0.0.1",
            port            : function(){ return 8585; }
        }

    }

  });

  // load libs
  grunt.loadTasks('./tasks/');
  
  grunt.registerTask(
    'default', 
    [
        'http-server'
    ]);

};
