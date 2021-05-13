/**
 * API for `crawl` operations.
 *
 * @module api/crawl
 */
const crawlHandler = require('./handlers/crawl');

/**
 * @function getPath
 * Get the path for a crawl.
 *
 * @private
 * @param {object} config - Configuration object.
 * @returns {string} - path.
 */
const getPath = (config) => {
  const target = config.get('command.options.target');
  return config.get(`${target}.url`);
};

/**
 * @callback storePageCallback
 * Callback to store a page.
 *
 * @param {string} path - Path of the page to store.
 * @param {object} status - Status of fetched page. Contains `status` (integer) and `statusText` (optional string).
 * @param {Cheerio} page - Page parsed by Cheerio.
 */
/**
 * @callback visitedCallback
 * Callback to check if we've already fetched the URL.
 *
 * @param {URL} url - URL of page to be fetched.
 * @returns {boolean} - true if it's been visited, false otherwise.
 */
/**
 * @function crawl
 * Crawl a website to a specified depth.
 *
 * @param {object} config - Configuration object for the crawl.
 * @param {storePageCallback} storePageCb - Optional. Callback to store a crawled page.
 * @param {visitedCallback} visitedCb - Optional. Callback to track visited page.
 */
const crawl = (config, storePageCb = null, visitedCb = null) => {
  const url = new URL(getPath(config));
  const depth = config.get('settings.depth');
  let storePage = storePageCb;
  // default storePage callback
  if (typeof storePage !== 'function') {
    storePage = (pagePath, status, page) => {
      if (status.status >= 400) {
        console.log(pagePath.href, ' -> ', status.status, status.statusText);
      } else {
        console.log(pagePath.href, ' -> ', page('title').text());
      }
    };
  }
  // default visited callback
  let visited = visitedCb;
  if (typeof visited !== 'function') {
    const visitedUrls = new Set();
    visited = (visitedUrl) => {
      if (visitedUrls.has(visitedUrl.href)) {
        return true;
      }
      visitedUrls.add(visitedUrl.href);
      return false;
    };
  }
  // call it!
  crawlHandler(url, depth, storePage, visited);
};

module.exports = crawl;
