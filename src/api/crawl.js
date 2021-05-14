/**
 * API for `crawl` operations.
 *
 * @module api/crawl
 */
const crawlHandler = require('./handlers/crawl');
const defaultStorage = require('./storage/default-storage');
const defaultTracker = require('./tracker/default-tracker');
const pathsTracker = require('./tracker/paths-tracker');

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
 * @callback trackerCallback
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
 * @param {trackerCallback} visitedCb - Optional. Callback to track visited page.
 */
const crawl = (config, storePageCb = null, visitedCb = null) => {
  const url = new URL(getPath(config));
  const depth = config.get('settings.depth');
  let storePage = storePageCb;
  // default storePage callback
  if (typeof storePage !== 'function') {
    storePage = defaultStorage();
  }
  // visited callback
  let visited = visitedCb;
  if (typeof visited !== 'function') {
    if (config.get('command.options.store') === 'paths') {
      visited = pathsTracker(config);
    } else {
      visited = defaultTracker();
    }
  }
  // call it!
  crawlHandler(url, depth, storePage, visited);
};

module.exports = crawl;
