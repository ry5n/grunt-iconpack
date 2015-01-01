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

  using_normal_files_array: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/svg-sprite/using-normal-files-array.svg');
    var expected = grunt.file.read('test/expected/svg-sprite/using-normal-files-array.svg');
    test.equal(actual, expected, 'Should build an SVG symbol sheet using normal Grunt Multi-Task files array.');

    test.done();
  },

  using_extensionless_filenames: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/svg-sprite/using-extensionless-filenames.svg');
    var expected = grunt.file.read('test/expected/svg-sprite/using-extensionless-filenames.svg');
    test.equal(actual, expected, 'Files array should accept extensionless file names as SVG.');

    test.done();
  },

  using_load_paths: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/svg-sprite/using-load-paths.svg');
    var expected = grunt.file.read('test/expected/svg-sprite/using-load-paths.svg');
    test.equal(actual, expected, 'Should allow conditional loading of icons from multiple sources.');

    test.done();
  },

  wrap_amd: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/svg-sprite/wrap-amd.svg.js');
    var expected = grunt.file.read('test/expected/svg-sprite/wrap-amd.svg.js');
    test.equal(actual, expected, 'Should wrap SVG output as an AMD module.');

    test.done();
  }
};
