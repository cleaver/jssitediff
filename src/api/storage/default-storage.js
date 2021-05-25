/**
 * Default storage callback.
 *
 * @module api/storage/default-storage
 */
const fs = require('fs');
const { sep } = require('path');

const getStorageDir = require('../../util/get-storage-dir');
const normalizeUrlPath = require('../../util/normalize-url-path');

/**
 * @function defaultStorage
 *
 * Return the default page storage callback.
 * @param {convict} config - configuration object.
 * @returns {function} page storage callback.
 */
const defaultStorage = (config) => {
  const storageDir = getStorageDir(config);
  /**
   * @function
   * Default storage callback function.
   *
   * @param {URL} url - Path of the page to store.
   * @param {object} status - Status of fetched page. Contains `status` (integer) and `statusText` (optional string).
   * @param {Cheerio} page - Page parsed by Cheerio.
   */
  return (url, status, page) => {
    if (status.status >= 400) {
      console.warn(url.href, ' -> ', status.status, status.statusText);
    } else {
      console.log(url.href, ' -> ', page('title').text());
      const [urlPath, filename] = normalizeUrlPath(url.pathname);
      const fullPath = [storageDir, urlPath].filter((e) => e).join(sep);
      fs.mkdirSync(fullPath, { recursive: true });
      fs.appendFileSync([fullPath, filename].join(sep), page.html());
    }
  };
};
module.exports = defaultStorage;
