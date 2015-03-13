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
      // Target-specific options and configuration go here.
    },
  },
});
```

### Options

#### options.loadPaths
Type: `Array`
Default value: `false`

An array of directory paths in which to search for source files. For each `src` path defined in the normal [Grunt files config](http://gruntjs.com/configuring-tasks#files), load paths are searched (in array order) for matching files. Once a match is found, successive load paths for that `src` are skipped.

This makes it easy to combine icon sets without having to write out the paths for each icon individually. The `src` property can hold an array of filenames, and the `loadPaths` option will load preferentially from the first path, then the second, and so on.

When using this option, the `src` files can contain any normal Grunt globbing patterns which will be expanded under each load path, `loadPaths` values can themselves contain glob patterns.

#### options.svgPrefix
Type: `String`
Default value: `''`

Add a prefix to the beginning of `<symbol>` ids. Useful as a namespace to 
avoid id attribute collisions. Example value: `'icon-'`.

#### options.removeTitleElement
Type: `Boolean`
Default value: `true`

By default, SVG `<title>` elements are removed. Change this option to `false` to keep them.

## Other Configuration

In addition to the `loadPaths` option, this module allows you to leave off extensions in `src` file paths. If absent, `.svg` will automatically be appended.

### Usage Examples

#### Build an SVG sprite from a single set of source files
In this example, the normal Grunt files array is used to build an SVG sprite from a single set of source SVGs.

```js
grunt.initConfig({
  iconpack: {
    basic_example: {
      files: [{
        expand: true,
        cwd: 'assets/icons/src',
        src: [
          'menu.svg',
          'search.svg',
          'chevron-*.svg',
        ],
        dest: 'assets/icons/sprite.svg'
      }]
    }
  },
});
```

#### Build an SVG sprite from several SVG sources
In this example, two sets of SVGs from different sources (here, a Bower component and some local files) are combined into one sprite.

The `loadPaths` option allows conditional loading of icons from several sets. In this example, if `menu.svg` is present in both load paths, the one found first (in this case, in `assets/icons/src`) will be used instead of any `menu.svg` provided by the Bower component.

Note that file extensions can be left off for source files; they will be appended automatically if absent.

```js
grunt.initConfig({
  iconpack: {
    using_load_paths: {
      options: {
        loadPaths: [
          'assets/icons/src/**',
          'bower_components/some-icon-set/svg/**'
        ]
      },
      files: [{
        src: [
          'menu',
          'search',
          'chevron-*',
        ],
        dest: 'assets/icons/sprite.svg'
      }]
    }
  },
});
```

#### Load icon definitions from an external file
The following example doesn’t demonstrate any unique functionality but it does show what is made possible by features such as the `loadPaths` option.

```js
grunt.initConfig({
  iconpack: {
    build_svg_sprite: {
      options: {
        loadPaths: [
          'assets/icons/src/**',
          'bower_components/some-icon-set/svg/**'
        ]
      },
      files: [{
        src: grunt.file.readJSON('assets/icons.json'),
        dest: 'assets/icons/sprite.svg'
      }]
    }
  },
});
```

`icons.json` might look like this:

```json
[
  "menu",
  "search",
  "chevron-*"
]
```

This makes it easy to change which icons will be built into a sprite once `loadPaths` are defined.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/): just run the following command in the project root:

```shell
grunt
```

## Release History

_(Nothing yet)_
