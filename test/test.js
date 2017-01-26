// const fs = require('fs');
const Filesystem = require('../index.js');
const expect = require('expect.js');

let filesystemWrapper;
const options = {
  action: 'cp',
  source: 'test/test-invalid.txt',
  dist: 'tmp/test.txt',
};

const invalidOptionsType = '';
const invalidOptionsObj = {};

describe('Filesystem plugin', () => {
  it('should be instantiated', () => {
    filesystemWrapper = new Filesystem(options);
    expect(typeof filesystemWrapper).to.equal('object');
  });

  it('should throw error', () => {
    const noParamConstructor = function () {
      // eslint-disable-next-line no-new
      new Filesystem();
    };

    expect(noParamConstructor).to.throwException();
  });

  it('should have default options', () => {
    expect(filesystemWrapper.buildTrigger).to.equal('after-emit');
    expect(filesystemWrapper.silent).to.equal(true);
    expect(filesystemWrapper.verbose).to.equal(false);
  });

  it('should have valid options', () => {
    expect(Filesystem.hasValidOptions(options)).to.equal(true);
  });

  it('should detect invalid options (string)', () => {
    expect(Filesystem.hasValidOptions(invalidOptionsType)).to.equal(false);
  });

  it('should have required parameters', () => {
    expect(Filesystem.hasRequiredParameters(options)).to.equal(true);
  });

  it('should detect missing required parameters', () => {
    expect(Filesystem.hasRequiredParameters(invalidOptionsObj)).to.equal(false);
  });

  it('should detect missing file', () => {
    expect(filesystemWrapper.copy()).to.equal(false);
  });

  it('should copy file', () => {
    filesystemWrapper.source = 'test/test.txt';
    expect(filesystemWrapper.copy()).to.equal(true);

    // expect(fs.existsSync(filesystemWrapper.dist)).to.equal(true);
  });
});
