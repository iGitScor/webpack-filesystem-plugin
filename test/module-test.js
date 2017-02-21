const Filesystem = require('../index.js');
const expect = require('expect.js');

let filesystemWrapper;
const options = {
  action: 'cp',
  source: 'YY',
};

// Duplicate options to add all the entries
const allOptions = JSON.parse(JSON.stringify(options));
allOptions.buildTrigger = 'after-emit';

const invalidOptionsType = '';
const invalidOptionsObj = {};

describe('Filesystem plugin', () => {
  beforeEach(() => {
    filesystemWrapper = new Filesystem(options);
  });

  it('can be instantiated', () => {
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
    expect(Filesystem.hasValidOptions({ action: 'XX', buildTrigger: 'none' })).to.equal(false);
  });

  it('should validate required parameters', () => {
    expect(Filesystem.hasRequiredParameters(options)).to.equal(true);
  });

  it('should detect missing required parameters', () => {
    expect(Filesystem.hasRequiredParameters(invalidOptionsObj)).to.equal(false);
  });
});
