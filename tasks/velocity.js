/*
 * grunt-velocity
 * https://github.com/stephenwil/grunt-velocity
 *
 * Copyright (c) 2015 Stephen Wilson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('velocity', 'Grunt plugin to run velocity templates through a velocity engine in an un-opinionated way', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options(),
    Engine = require('velocity').Engine,
      count = 0;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      
      
      if (options.data && !grunt.file.exists(options.data)) {
        grunt.log.warn('Data file"' + options.data + '" not found.');
        return false;
      }

      f.src.forEach(function(file) {
        grunt.log.ok('Processing ' + file);
        
        if (!grunt.file.exists(file)) {
          grunt.log.warn('Source file "' + file + '" not found.');
          return false;
        }
        
        parseVelocity(file, f.dest, Engine, options.data);
        count++;
      });
      
      grunt.log.ok('Parsed ' + count + ' file(s)');
    });
    
    function parseVelocity(srcFile, dest, Engine, dataFile) {

      // read the data file
      var data = grunt.file.readJSON(dataFile, {encoding: 'utf8'});
      
      // read the src file
      var src = grunt.file.read(srcFile);
     
      var engine = new Engine({
        template: src
      });
      var output = engine.render(data);

      // Write the destination file.
      grunt.file.write(dest + srcFile.replace('.vm','.html'), output);


    }
  });

};
