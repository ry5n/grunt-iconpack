# grunt-iconpack

> Package SVG icons as an SVG sprite. Support for webfonts is planned.

## Getting Started

This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-iconpack --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-iconpack');
```

## The "iconpack" task

### Overview
In your project's Gruntfile, add a section named `iconpack` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  iconpack: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific options and configuration go here. Note this module
      // does not use the normal `files` key for input/output mapping.
    },
  },
});
```

### Options

#### options.output
Type: `String`
Default value: `svg sprite`

Currently only accepts the default value. In future will support `webfont` or similar for packaging as a webfont.

## Other Configuration

This module doesn’t use the normal `files` key for input/output mapping. Instead, it uses three custom keys: `icons`, `sources` and `dest`. The normal content for `files.src` is built dynamically from `icons` and `sources` (see details below). The `dest` key accepts a string for a single file destination.

#### icons
Type: `Array`
Default value: none

Accepts an array of icon names. Each directory configured in the `sources` array will be searched for SVG files with these names (minus extension). So for an array value `menu`, `sources` will be searched for `menu.svg`.

#### sources
Type: `Array`
Default value: none

Accepts an array of directory paths. For each value configured in the `icons` array, the `sources` directory paths will be searched *in reverse* for a file named `{icon}.svg`. The first matching file for each icon will be used.

This behaviour is intended to make it easy to substitute an icon in a vendor set with a local version with the same name by specifying the local source directory after the vendor directory. So for a `sources` array of `['vendor/svg', 'my/svg']`, `{icon}.svg` is first searched for in `my/svg`. If found, it will be used. If not, `vendor/svg` will be searched, and so on.

Currently, only files directly in the specified `source` directories – not sub-directories – will be found.

#### dest
Type: `String`
Default value: none

Accepts a string specifying the output icon file (SVG sprite). Includes the path, file name and extension.

### Usage Examples

#### Build an SVG sprite from two SVG sources
In this example, two sets of SVGs from different sources (here, a Bower component and some local files) are combined into one sprite.

```js
grunt.initConfig({
  iconpack: {
    options: {},
    icons: [
      'chevron-right',
      'chevron-down',
      'menu',
      'search'
    ],
    sources: [
      'bower_components/some-icon-lib/svg',
      'assets/images/icons/src'
    ],
    dest: 'assets/images/icons/sprite.svg'
  },
});
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

_(Nothing yet)_
