/*
 * grunt-iconpack
 * https://github.com/ry5n/grunt-iconpack
 *
 * Copyright (c) 2014 Ryan L. Frederick
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    iconpack: {
      using_normal_files_array: {
        options: {},
        files: [{
          src: [
            'test/fixtures/custom/**/*.svg',
            'test/fixtures/vendor/menu.svg',
            'test/fixtures/vendor/chevron-*.svg'
          ],
          dest: 'tmp/svg-sprite/using-normal-files-array.svg'
        }]
      },

      using_extensionless_filenames: {
        options: {},
        files: [{
          src: [
            'test/fixtures/custom/search',
            'test/fixtures/vendor/menu',
            'test/fixtures/vendor/chevron-*'
          ],
          dest: 'tmp/svg-sprite/using-extensionless-filenames.svg'
        }]
      },

      using_load_paths: {
        options: {
          loadPaths: [
            'test/fixtures/custom/**',
            'test/fixtures/vendor/**'
          ]
        },
        files: [{
          src: [
            'menu.svg',
            'chevron-*.svg',
            'search'
          ],
          dest: 'tmp/svg-sprite/using-load-paths.svg'
        }]
      },

      wrap_amd: {
        options: {
          loadPaths: [
            'test/fixtures/custom/**',
            'test/fixtures/vendor/**'
          ],
          wrapper: 'amd'
        },
        files: [{
          src: [
            'menu.svg',
            'chevron-*.svg',
            'search'
          ],
          dest: 'tmp/svg-sprite/wrap-amd.svg'
        }]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'iconpack', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
