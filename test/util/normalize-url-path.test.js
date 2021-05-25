const normalizeUrlPath = require('../../src/util/normalize-url-path');

describe('normalizeUrlPath tests', () => {
  test('test empty path', () => {
    const [path, file] = normalizeUrlPath('');
    expect(path).toBe('');
    expect(file).toBe('index.html');
  });

  test('test single slash', () => {
    const [path, file] = normalizeUrlPath('/');
    expect(path).toBe('');
    expect(file).toBe('index.html');
  });

  test('trailing slashes', () => {
    const [path, file] = normalizeUrlPath('/blog/hello///');
    expect(path).toBe('blog/hello');
    expect(file).toBe('index.html');
  });

  test('no trailing slashes', () => {
    const [path, file] = normalizeUrlPath('/blog/hello');
    expect(path).toBe('blog/hello');
    expect(file).toBe('index.html');
  });

  test('no preceding slashes', () => {
    const [path, file] = normalizeUrlPath('blog/hello');
    expect(path).toBe('blog/hello');
    expect(file).toBe('index.html');
  });

  test('html file', () => {
    const [path, file] = normalizeUrlPath('/blog/hello.html');
    expect(path).toBe('blog');
    expect(file).toBe('hello.html');
  });

  test('htm file', () => {
    const [path, file] = normalizeUrlPath('/blog/hello.htm');
    expect(path).toBe('blog');
    expect(file).toBe('hello.htm');
  });
});
