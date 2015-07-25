"use strict";

var bump = {

    options: {
      files: [ 'package.json', 'bower.json' ],
      updateConfigs: [],
      commit: false,
      commitMessage: 'Release v%VERSION%',
      commitFiles: [ 'package.json','bower.json' ],
      createTag: false,
      tagName: 'v%VERSION%',
      tagMessage: 'Version %VERSION%',
      push: false,
      pushTo: 'upstream',
      gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
      globalReplace: false
    }

};

module.exports = bump;