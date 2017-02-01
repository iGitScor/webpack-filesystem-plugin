// const fs = require('fs');
const Filesystem = require('../index.js');
const expect = require('expect.js');

let filesystemWrapper;
const options = {
  action: 'cp',
  source: 'test/test-invalid.txt',
  dist: 'tmp/test.txt',
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

describe('Filesystem plugin', () => {
  beforeEach(() => {
    filesystemWrapper = new Filesystem(options);
  });

  it('can be instantiated', () => {
    filesystemWrapper = new Filesystem(options);
    expect(typeof filesystemWrapper).to.equal('object');
  });

  it('should throw error when no parameters', () => {
    const noParamConstructor = function () {
      // eslint-disable-next-line no-new
      new Filesystem();
    };

    expect(noParamConstructor).to.throwException(/Parameters are invalid/);
  });

  it('should throw error when parameter format is wrong', () => {
    const wrongParamConstructor = function () {
      // eslint-disable-next-line no-new
      new Filesystem({});
    };

    expect(wrongParamConstructor).to.throwException(/Required parameters are missing/);
  });

  it('should have default options', () => {
    expect(filesystemWrapper.buildTrigger).to.equal('after-emit');
    expect(filesystemWrapper.silent).to.equal(true);
    expect(filesystemWrapper.verbose).to.equal(false);
  });

  it('should validate options', () => {
    expect(Filesystem.hasValidOptions(options)).to.equal(true);
    expect(Filesystem.hasValidOptions(allOptions)).to.equal(true);
  });

  it('should detect invalid options', () => {
    expect(Filesystem.hasValidOptions(invalidOptionsType)).to.equal(false);
    expect(Filesystem.hasValidOptions({ buildTrigger: 'after-emit' })).to.equal(false);
    expect(Filesystem.hasValidOptions({ action: 'cp', buildTrigger: 'none' })).to.equal(false);
  });

  it('should validate required parameters', () => {
    expect(Filesystem.hasRequiredParameters(options)).to.equal(true);
  });

  it('should detect missing required parameters', () => {
    expect(Filesystem.hasRequiredParameters(invalidOptionsObj)).to.equal(false);
  });

  it('should detect missing file', () => {
    const copy = function () {
      filesystemWrapper.copy();
    };

    expect(copy).to.throwException(/File not found/);
  });

  it('should throw exception if the command fail', () => {
    const copy = function () {
      filesystemWrapper.copy();
    };

    filesystemWrapper.dist = 'tmp/test.txt';
    filesystemWrapper.source = 'test/test.txt';

    expect(copy).to.throwException(/Command fail/);
  });

  it('should apply compiler (webpack-mock)', () => {
    filesystemWrapper.source = 'test/test.txt';
    filesystemWrapper.dist = 'test/tmp.txt';
    filesystemWrapper.apply(compiler);
  });
});
