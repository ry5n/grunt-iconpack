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
      default_options: {
        options: {},
        icons: [
          'chevron-up',
          'chevron-down',
          'menu',
          'search'
        ],
        sources: ['test/fixtures/main'],
        dest: 'tmp/svg-sprite/default-options.svg'
      },

      multiple_sources: {
        options: {},
        icons: [
          'chevron-up',
          'chevron-down',
          'menu',
          'search'
        ],
        sources: ['test/fixtures/main', 'test/fixtures/alt'],
        dest: 'tmp/svg-sprite/multiple-sources.svg'
      },

      glob_sources: {
        options: {},
        icons: [
          'chevron-*',
          'menu',
          'search'
        ],
        sources: ['test/fixtures/main', 'test/fixtures/alt'],
        dest: 'tmp/svg-sprite/glob-sources.svg'
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
