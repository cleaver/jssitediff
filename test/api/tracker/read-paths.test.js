const { sep } = require('path');
const readPaths = require('../../../src/api/tracker/read-paths');
const configLoader = require('../../../src/config/configLoader');

describe('readPaths', () => {
  test('throws error if paths.txt empty or missing', () => {
    const config = configLoader(`test${sep}test-data${sep}no-paths`);
    config.set('command.options.target', 'before');
    expect(() => {
      readPaths(config);
    }).toThrow();
  });

  test('returns expected list from paths.txt', () => {
    const config = configLoader(`test${sep}test-data`);
    config.set('command.options.target', 'before');
    const paths = readPaths(config);
    expect(paths).toHaveLength(3);
    expect(paths[1].href).toBe('http://example.com/about');
  });
});
