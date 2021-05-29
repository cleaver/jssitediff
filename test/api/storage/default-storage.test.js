/* eslint-disable no-unused-vars */
const cheerio = require('cheerio');
const fs = require('fs');
const { sep } = require('path');

const defaultStorage = require('../../../src/api/storage/default-storage');
const configLoader = require('../../../src/config/configLoader');
const getStorageDir = require('../../../src/util/get-storage-dir');

jest.mock('fs');
jest.mock('../../../src/util/get-storage-dir', () =>
  jest.fn(() => 'storage-dir')
);
jest.mock('../../../src/util/normalize-url-path.js', () =>
  jest.fn(() => ['path', 'file'])
);

describe('defaultStorage', () => {
  const urlParam = {
    href: 'http://example.com',
    pathname: '',
  };
  const pageText =
    '<html><head><title>Sitediff!</title></head><body><p>Wassup?</p></body></html>';
  const pageParam = cheerio.load(pageText);
  let config;

  beforeEach(() => {
    config = configLoader(`test${sep}test-data`);
    config.set('command.options.target', 'before');
  });

  test('returns function', () => {
    const callback = defaultStorage(config);
    expect(typeof callback).toBe('function');
    expect(getStorageDir).toHaveBeenCalled();
  });

  test('gives error message', () => {
    const consoleSpy = jest.spyOn(console, 'warn');
    const callback = defaultStorage(config);
    callback(urlParam, { status: 404, statusText: 'oops!' }, pageParam);
    expect(consoleSpy).toHaveBeenCalledWith(
      'http://example.com',
      ' -> ',
      404,
      'oops!'
    );
  });

  test('gives success message', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const callback = defaultStorage(config);
    callback(urlParam, { status: 200, statusText: '' }, pageParam);
    expect(consoleSpy).toHaveBeenCalledWith(
      'http://example.com',
      ' -> ',
      'Sitediff!'
    );
  });

  test('stores page in correct location', () => {
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync');
    const appendSpy = jest.spyOn(fs, 'appendFileSync');
    const callback = defaultStorage(config);
    callback(urlParam, { status: 200, statusText: '' }, pageParam);
    expect(mkdirSpy).toHaveBeenCalledWith(`storage-dir${sep}path`, {
      recursive: true,
    });
    expect(appendSpy).toHaveBeenCalledWith(
      `storage-dir${sep}path${sep}file`,
      pageText
    );
  });
});
