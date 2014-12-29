/*
 * grunt-iconpack
 * https://github.com/ry5n/grunt-iconpack
 *
 * Copyright (c) 2014 Ryan L. Frederick
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  // Load dependencies.
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-svgmin');

  grunt.registerMultiTask('iconpack', 'Package SVG icons as an SVG sprite.', function() {

    if (grunt.option('debug')) {
      grunt.log.writeln('Original normalized files:', JSON.stringify(this.files));
    }

    var defaults = {
      loadPaths: false
    };
    var options = this.options(defaults);
    var files = [];

    // Since we offer some very custom ways to build the files object, we need
    // to resolve paths manually.
    files = this.files.map(function(f, i) {
      var srcPatterns = [];
      var srcFiles = [];

      if (grunt.option('debug')) {
        grunt.log.writeln('f.orig.src[' + i + ']:', JSON.stringify(f.orig.src));
      }

      //
      // Add the `.svg` extension to patterns if absent.
      //
      srcPatterns = f.orig.src.map(function(pattern) {
        if (pattern.indexOf('.') === -1) {
          pattern = pattern + '.svg';
        }

        return pattern;
      });

      if (grunt.option('debug')) {
        grunt.log.writeln(
          'srcPatterns[' + i + '] (extensioned):',
          JSON.stringify(srcPatterns)
        );
      }

      //
      // If loadPaths were specfified, attempt to expand each file src pattern
      // using the loadPaths as cwd. The first matching expansion will be used;
      // successive loadPaths for that pattern will be skipped.
      //
      if (options.loadPaths.length) {
        if (grunt.option('debug')) {
          grunt.log.writeln(
            'loadPaths in use:',
            JSON.stringify(options.loadPaths)
          );
        }

        srcPatterns.forEach(function(pattern) {
          for (var i = 0, len = options.loadPaths.length; i < len ; i++) {
            var patternAtLoadPath = path.join(options.loadPaths[i], pattern);
            var matchedFiles = grunt.file.expand(patternAtLoadPath);

            if (matchedFiles.length) {
              Array.prototype.push.apply(srcFiles, matchedFiles);
              break;
            }
          }
        });
      } else {
        // If loadPaths were not used, just expand the patterns directly.
        srcFiles = grunt.file.expand(srcPatterns);
      }

      if (grunt.option('debug')) {
        grunt.log.writeln(
          'srcFiles[' + i + '] (Renormalized sources):',
          JSON.stringify(srcFiles)
        );
      }

      // Return the renormalized file object.
      return {
        src: srcFiles,
        dest: f.dest
      };
    });

    if (grunt.option('debug')) {
      grunt.log.writeln('Renormalized files:', JSON.stringify(files));
    }

    // Build config for running plugin-based subtasks.
    grunt.config.merge({
        svgstore: {
            iconpack: {
                files: files,
            },
        },
        svgmin: {
            iconpack: {
                options: {
                    plugins: [
                        {removeTitle: true},
                        {cleanupIDs: false}
                    ]
                },
                files: [{
                    expand: true,
                    src: files.map(function(f) {
                      return f.dest;
                    })
                }]
            }
        }
    });

    // Run subtasks.
    grunt.task.run(['svgstore:iconpack', 'svgmin:iconpack']);

  });

};
