const fs = require('fs');
const { sep } = require('path');

const configLoader = require('../../src/config/configLoader');
const getStorageDir = require('../../src/util/get-storage-dir');

// @ponicode
describe('test util / getStorageDir', () => {
  const snapshotDir = `${process.cwd()}${sep}test${sep}test-data${sep}snapshot`;
  let config;

  beforeAll(() => {
    fs.rmSync(snapshotDir, { recursive: true, force: true });
  });

  beforeEach(() => {
    config = configLoader(`test${sep}test-data`);
  });

  afterAll(() => {
    fs.rmSync(snapshotDir, { recursive: true, force: true });
  });

  test('storage is found and created', () => {
    config.set('command.options.target', 'before');

    expect(getStorageDir(config)).toBe(`${snapshotDir}${sep}before`);
    expect(fs.existsSync(`${snapshotDir}${sep}before`)).toBe(true);

    // run a second time to get all branches
    expect(getStorageDir(config)).toBe(`${snapshotDir}${sep}before`);
  });
});
