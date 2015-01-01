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
  // We don’t want to use loadTasks or loadNpmTasks because those only work for
  // the top level of the dependency tree.
  require('grunt-svgstore/tasks/svgstore')(grunt);
  require('grunt-svgmin/tasks/svgmin')(grunt);
  require('grunt-wrap/tasks/wrap')(grunt);

  grunt.registerMultiTask('iconpack', 'Package SVG icons as an SVG sprite.', function() {

    if (grunt.option('debug')) {
      grunt.log.writeln('Original normalized files:', JSON.stringify(this.files));
    }

    var defaults = {
      loadPaths: false,
      wrapper: false
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

    // Run main subtasks.
    grunt.task.run(['svgstore:iconpack', 'svgmin:iconpack']);

    // Handle the wrapper option.

    if (options.wrapper) {
      var amdWrapper = ['define(function() { return \'', '\'; });'];
      var cjsWrapper = ['module.exports = \'', '\';'];
      var wrapper;
      var stringEndsWith = function(string, end) {
        var position = string.length - end.length;
        var lastIndex = string.indexOf(end, position);
        return lastIndex !== -1 && lastIndex === position;
      };

      if (typeof options.wrapper === 'string') {
        switch (options.wrapper) {
          case 'amd':
            wrapper = amdWrapper;
            break;
          case 'cjs':
            wrapper = cjsWrapper;
            break;
          default:
            break;
        }
      } else {
        wrapper = options.wrapper;
      }

      grunt.config.merge({
        wrap: {
          iconpack: {
            options: {
              wrapper: wrapper,
              separator: ''
            },
            files: [{
                expand: true,
                src: files.map(function(f) {
                  return f.dest;
                }),
                ext: '.svg.js'
            }]
          }
        },
        clean: {
          iconpack: {
            src: files.map(function(f) {
              if (stringEndsWith(f.dest, '.svg.js')) {
                f.dest = f.dest.replace('.svg.js', '.svg');
              }
              return f.dest;
            })
          }
        }
      });

      grunt.task.run(['wrap:iconpack', 'clean:iconpack']);
    }

  });

};
