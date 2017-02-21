const _ = require('lodash');
const fs = require('fs');
const childProcess = require('child_process');

const validAction = ['cp', 'rm'];
const validBuildTrigger = ['after-emit', 'done', 'failed'];

module.exports = class Filesystem {
  constructor(options) {
    if (Filesystem.hasValidOptions(options)) {
      this.action = options.action;
      this.source = options.source;

      // Optional parameters
      this.dist = options.dist || null;
      this.buildTrigger = options.buildTrigger || 'after-emit';
      this.silent = options.silent || true;
      this.verbose = !this.silent;
    } else {
      // Throw exception
      const error = typeof options === 'object'
        ? 'Required parameters are missing'
        : 'Parameters are invalid';

      throw new Error(error);
    }
  }

  static hasRequiredParameters(options) {
    return Object.hasOwnProperty.call(options, 'action') &&
      Object.hasOwnProperty.call(options, 'source');
  }

  static hasValidOptions(options) {
    if (typeof options !== 'object') {
      return false;
    }

    return Filesystem.hasRequiredParameters(options) &&
      (!Object.hasOwnProperty.call(options, 'action') ||
        validAction.indexOf(options.action) >= 0) &&
      (!Object.hasOwnProperty.call(options, 'buildTrigger') ||
        validBuildTrigger.indexOf(options.buildTrigger) >= 0);
  }

  execute() {
    if (fs.existsSync(this.source)) {
      const argumentsArray = [this.source, this.dist];
      const spawn = childProcess.spawnSync(this.action, _.without(argumentsArray, null));
      const errorText = spawn.stderr.toString().trim();

      if (errorText) {
        throw new Error('Command failed');
      }

      return true;
    }

    throw new Error('File not found');
  }

  apply(compiler) {
    const that = this;
    compiler.plugin(this.buildTrigger, (compilation, callback) => {
      that.execute();
      callback();
    });
  }
};
