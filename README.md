# Webpack filesystem plugin

Filesystem wrapper

[![Build Status][build-badge]][build]
[![codecov][codecoverage-badge]][codecoverage]
[![Dependencies][dependencyci-badge]][dependencyci]
[![dependencies Status][dependencies-badge]][dependencies]
[![devDependencies Status][devDependencies-badge]][devDependencies]
[![MIT License][license-badge]][LICENSE]

## Install Instructions

```bash
$ npm i webpack-filesystem-plugin
```
Note: This plugin needs NodeJS >= 6

## Usage Instructions

**Require `webpack-filesystem-plugin`**
```javascript
var WebpackFilesystem = require('webpack-filesystem-plugin')
```

Add the plugin to your plugin list
```javascript
var config = {
  plugins: [
    new WebpackFilesystem({
      action: 'cp',
      source: 'test.txt',
      dist: 'awesome.txt',
    })
  ]
}
```

### Options

#### Actions

- [cp](docs/cp.md): Copy files or directories
- [rm](docs/rm.md): Remove files or directories

#### Common options

- `silent` _(bool)_: Display/hide info logs
- `buildTrigger` _(string)_: Webpack build step (c.f [plugin documentation](https://webpack.github.io/docs/plugins.html)). See below accepted steps:
  - `after-emit`
  - `done`
  - `failed`

Use silent mode
```javascript
var config = {
  plugins: [
    new WebpackFilesystem({
      silent: true,
      action: 'cp',
      source: 'test.txt',
      dist: 'awesome.txt',
    })
  ]
}
```

### Contributing

All contributions are welcome. Please make a pull request and make sure things still pass after running `npm test`

[build-badge]: https://img.shields.io/travis/iGitScor/webpack-filesystem-plugin.svg?style=flat-square
[build]: https://travis-ci.org/iGitScor/webpack-filesystem-plugin
[codecoverage-badge]: https://codecov.io/gh/iGitScor/webpack-filesystem-plugin/branch/master/graph/badge.svg?style=flat-square
[codecoverage]: https://codecov.io/gh/iGitScor/webpack-filesystem-plugin
[dependencyci-badge]: https://dependencyci.com/github/iGitScor/webpack-filesystem-plugin/badge?style=flat-square
[dependencyci]: https://dependencyci.com/github/iGitScor/webpack-filesystem-plugin
[dependencies-badge]: https://david-dm.org/iGitScor/webpack-filesystem-plugin/status.svg?style=flat-square
[dependencies]: https://david-dm.org/iGitScor/webpack-filesystem-plugin
[devDependencies-badge]: https://david-dm.org/iGitScor/webpack-filesystem-plugin/dev-status.svg?style=flat-square
[devDependencies]: https://david-dm.org/iGitScor/webpack-filesystem-plugin?type=dev
[license-badge]: https://img.shields.io/apm/l/webpack-filesystem-plugin.svg?style=flat-square
[license]: https://github.com/iGitScor/webpack-filesystem-plugin/blob/master/LICENSE
