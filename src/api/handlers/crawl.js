/**
 * Crawl a site.
 *
 * @module api/handlers/crawl
 */
const axios = require('axios');
const cheerio = require('cheerio');
const filterUrls = require('../../util/filter-urls');

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
 * @param {URL} url - URL to crawl. EG: `new URL('http://example.com/foo')`.
 * @param {number} depth - Maximum depth for the crawl. EG: `3`.
 * @param {storePageCallback} storePage - Callback to store a crawled page.
 * @param {visitedCallback} visited - Callback to track visited page.
 */
const crawl = (url, depth, storePage, visited) => {
  if (visited(url)) {
    return;
  }
  axios
    .get(url.href)
    .then((response) => {
      const page = cheerio.load(response.data);
      storePage(url, { status: response.status }, page);
      if (depth > 0) {
        filterUrls(
          url,
          page('a').map((i, a) => page(a).attr('href'))
        ).forEach((link) => {
          crawl(link, depth - 1, storePage, visited);
        });
      }
    })
    .catch((error) => {
      if (error.response?.status) {
        storePage(
          url,
          {
            status: error.response.status,
            statusText: error.response.statusText,
          },
          null
        );
      } else {
        throw error;
      }
    });
};

module.exports = crawl;
