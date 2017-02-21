const fs = require('fs');
const Filesystem = require('../index.js');
const expect = require('expect.js');
const webpackMock = require('webpack-mock');

let filesystemWrapper;
const options = {
  action: 'rm',
  source: 'test/test-invalid.txt',
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
    filesystemWrapper.apply(webpackMock);
  });
});
