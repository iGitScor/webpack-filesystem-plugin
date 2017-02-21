const fs = require('fs');
const Filesystem = require('../index.js');
const expect = require('expect.js');
const webpackMock = require('webpack-mock');

let filesystemWrapper;
const options = {
  action: 'cp',
  source: 'test/test-invalid.txt',
  dist: 'tmp/test.txt',
};

describe('Copy function', () => {
  before(() => {
    fs.writeFileSync('test/test.txt', 'iscor.me');
  });

  beforeEach(() => {
    filesystemWrapper = new Filesystem(options);
  });

  after(() => {
    fs.unlinkSync('test/tmp.txt');
    fs.unlinkSync('test/test.txt');
  });

  it('should detect missing file', () => {
    const copy = function () {
      filesystemWrapper.execute();
    };

    expect(copy).to.throwException(/File not found/);
  });

  it('should throw exception if the command fail', () => {
    const copy = function () {
      filesystemWrapper.execute();
    };

    filesystemWrapper.dist = 'tmp/test.txt';
    filesystemWrapper.source = 'test/test.txt';

    expect(copy).to.throwException(/Command fail/);
  });

  it('should apply compiler (webpack-mock)', () => {
    filesystemWrapper.source = 'test/test.txt';
    filesystemWrapper.dist = 'test/tmp.txt';
    filesystemWrapper.apply(webpackMock);
  });
});
