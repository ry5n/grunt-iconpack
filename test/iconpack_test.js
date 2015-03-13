'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.iconpack = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  normal_files_array: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/svg-sprite/normal-files-array.svg');
    var expected = grunt.file.read('test/expected/svg-sprite/normal-files-array.svg');
    test.equal(actual, expected, 'Should build an SVG symbol sheet using normal Grunt Multi-Task files array.');

    test.done();
  },

  extensionless_filenames: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/svg-sprite/extensionless-filenames.svg');
    var expected = grunt.file.read('test/expected/svg-sprite/extensionless-filenames.svg');
    test.equal(actual, expected, 'Files array should accept extensionless file names as SVG.');

    test.done();
  },

  load_paths: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/svg-sprite/load-paths.svg');
    var expected = grunt.file.read('test/expected/svg-sprite/load-paths.svg');
    test.equal(actual, expected, 'Should allow conditional loading of icons from multiple sources.');

    test.done();
  },

  wrap_amd: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/svg-sprite/wrap-amd.svg.js');
    var expected = grunt.file.read('test/expected/svg-sprite/wrap-amd.svg.js');
    test.equal(actual, expected, 'Should wrap SVG output as an AMD module.');

    test.done();
  },

  svg_prefix: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/svg-sprite/svg-prefix.svg');
    var expected = grunt.file.read('test/expected/svg-sprite/svg-prefix.svg');
    test.equal(actual, expected, 'Should pass through the ID prefix option to grunt-svgstore.');

    test.done();
  },

  include_titles: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/svg-sprite/include-titles.svg');
    var expected = grunt.file.read('test/expected/svg-sprite/include-titles.svg');
    test.equal(actual, expected, 'Should build an SVG symbol sheet including Title elements.');

    test.done();
  },
};
