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
    // Merge task-specific and/or target-specific options with these defaults.
    var defaults = {
      output: 'svg sprite'
    };
    var options = this.options(defaults);
    var files = {src: [], dest: ''};
    var data = this.data;

    if (options.output !== defaults.output) {
      grunt.log.warn('Only SVG sprites are supported at the moment.');
      return false;
    }

    data.icons.forEach(function(icon) {
      for (var i = data.sources.length - 1; i >= 0; i--) {
        var matchedFiles = grunt.file.expand(path.join(data.sources[i], icon + '.svg'));

        if (matchedFiles.length) {
          Array.prototype.push.apply(files.src, matchedFiles);
          break;
        }
      }
    });

    if (!files.src.length) {
      grunt.log.warn('No icons found. Make sure at least one directory is given in the `sources` key.');
      return false;
    }

    if (typeof data.dest === 'string') {
      files.dest = data.dest;
    } else {
      grunt.log.warn('Dest must be a single path string.');
      return false;
    }

    grunt.log.writeln(files.src);
    grunt.log.writeln(files.dest);

    grunt.config.merge({
        svgstore: {
            iconpack: {
                files: [{
                  src: files.src,
                  dest: files.dest
                }],
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
                    src: files.dest
                }]
            }
        }
    });

    grunt.task.run(['svgstore:iconpack', 'svgmin:iconpack']);
  });

};
