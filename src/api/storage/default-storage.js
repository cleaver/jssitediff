/**
 * Default storage callback.
 *
 * @module api/storage/default-storage
 */
/**
 * @function defaultStorage
 *
 * Default page storage callback.
 *
 * @param {string} path - Path of the page to store.
 * @param {object} status - Status of fetched page. Contains `status` (integer) and `statusText` (optional string).
 * @param {Cheerio} page - Page parsed by Cheerio.
 */
const defaultStorage = (pagePath, status, page) => {
  if (status.status >= 400) {
    console.log(pagePath.href, ' -> ', status.status, status.statusText);
  } else {
    console.log(pagePath.href, ' -> ', page('title').text());
  }
};
module.exports = defaultStorage;
