const crawlHandler = require('./handlers/crawl');

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
 * @return {boolean} - true if it's been visited, false otherwise.
 */
/**
 * @function crawl
 * Crawl a website to a specified depth.
 *
 * @param {string} path - Path to start of crawl. EG: `'http://example.com/foo'`.
 * @param {number} depth - Maximum depth for the crawl. Optional. Default: `3`.
 * @param {storePageCallback} storePageCb - Optional. Callback to store a crawled page.
 * @param {visitedCallback} visitedCb - Optional. Callback to track visited page.
 */
const crawl = (path, depth = 3, storePageCb = null, visitedCb = null) => {
  const url = new URL(path);
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
