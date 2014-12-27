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
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/svg-sprite/default-options.svg');
    var expected = grunt.file.read('test/expected/svg-sprite/default-options.svg');
    test.equal(actual, expected, 'Should build an SVG symbol sheet from given sources.');

    test.done();
  },
  multiple_sources: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/svg-sprite/multiple-sources.svg');
    var expected = grunt.file.read('test/expected/svg-sprite/multiple-sources.svg');
    test.equal(actual, expected, 'Should build icons from multiple sources.');

    test.done();
  }
};
