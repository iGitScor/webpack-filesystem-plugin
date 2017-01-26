# Webpack filesystem plugin

Filesystem wrapper

[![Build Status](https://travis-ci.org/iGitScor/webpack-filesystem-plugin.svg?branch=master)](https://travis-ci.org/iGitScor/webpack-filesystem-plugin)
[![dependencies Status](https://david-dm.org/iGitScor/webpack-filesystem-plugin/status.svg)](https://david-dm.org/iGitScor/webpack-filesystem-plugin)
[![devDependencies Status](https://david-dm.org/iGitScor/webpack-filesystem-plugin/dev-status.svg)](https://david-dm.org/iGitScor/webpack-filesystem-plugin?type=dev)

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

### Contributing

All contributions are welcome. Please make a pull request and make sure things still pass after running `npm test`
