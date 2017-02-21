const fs = require('fs');
const Filesystem = require('../index.js');
const expect = require('expect.js');

let filesystemWrapper;
const options = {
  action: 'rm',
  source: 'test/test-invalid.txt',
};

// Duplicate options to add all the entries
const allOptions = JSON.parse(JSON.stringify(options));
allOptions.buildTrigger = 'after-emit';

const invalidOptionsType = '';
const invalidOptionsObj = {};

// Webpack plugin mock
const compiler = {
  plugin: (buildTrigger, callback) => {
    callback(null, () => {});
  },
};

describe('Remove function', () => {
  before(() => {
    fs.writeFileSync('test/tmp.txt', 'iscor.me');
  });

  beforeEach(() => {
    filesystemWrapper = new Filesystem(options);
  });

  it('should detect missing file', () => {
    const remove = function () {
      filesystemWrapper.execute();
    };

    expect(remove).to.throwException(/File not found/);
  });

  it('should apply compiler (webpack-mock)', () => {
    filesystemWrapper.source = 'test/tmp.txt';
    filesystemWrapper.apply(compiler);
  });
});
