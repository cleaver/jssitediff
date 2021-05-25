/**
 * @module util/normalize-url-path
 */
const { sep } = require('path');
/**
 * Clean up URL path prior to storage. Normalize for O/S.
 *
 * @param {string} urlPath - the path to be cleaned. EG: `/projects/sitediff//`.
 * @returns {array} two element array with path and filename. EG: `['projects/sitediff', 'index.html']`
 */
const normalizeUrlPath = (urlPath) => {
  const splitPath = urlPath.split('/').filter((str) => str);
  let fileName = null;
  if (splitPath.length && splitPath.slice(-1)[0].match(/^.+?\.html{0,1}$/)) {
    fileName = splitPath.pop();
  }
  const normalPath = [splitPath.join(sep), fileName ?? 'index.html'];
  return normalPath;
};

module.exports = normalizeUrlPath;
