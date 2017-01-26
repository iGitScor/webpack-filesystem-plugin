const fs = require('fs');
const childProcess = require('child_process');

const validAction = ['cp'];
const validBuildTrigger = ['after-emit', 'done', 'failed'];

module.exports = class Filesystem {
  constructor(options) {
    if (Filesystem.hasValidOptions(options)) {
      this.action = options.action;
      this.source = options.source;
      this.dist = options.dist;

      // Optional parameters
      this.buildTrigger = options.buildTrigger || 'after-emit';
    } else {
      // Throw exception
      const error = Filesystem.hasRequiredParameters(options)
        ? 'Parameters are invalid'
        : 'Required parameters are missing';

      throw new Error(error);
    }
  }

  static hasRequiredParameters(options) {
    return options.action && options.source && options.dist;
  }

  static hasValidOptions(options) {
    return Filesystem.hasRequiredParameters(options) &&
      (validAction.indexOf(options.action) >= 0 ||
        !Object.hasOwnProperty.call(options, 'action')) &&
      (validBuildTrigger.indexOf(options.buildTrigger) >= 0 ||
        !Object.hasOwnProperty.call(options, 'buildTrigger'));
  }

  copy() {
    if (fs.existsSync(this.source)) {
      childProcess.exec(`${this.action} ${this.source} ${this.dist}`, (exception) => {
        if (exception) {
          throw exception;
        }
      });
    } else {
      // Display replacement patterns
      const fileNotExist = '\x1B[34mFile not found (%s)\x1B[0m';

      // eslint-disable-next-line no-console
      console.warn(fileNotExist, this.source);
    }
  }

  apply(compiler) {
    const that = this;
    compiler.plugin(this.buildTrigger, (compilation, callback) => {
      that.copy();
      callback();
    });
  }
};