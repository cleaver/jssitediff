/**
 * Utility module for URL filtering
 *
 * @module util/filterUrls
 */
/**
 * @function filterUrls
 * Filter a list of URLs, removing external links and duplicates.
 *
 * @param {URL} page - URL of the page.
 * @param {Cheerio} hrefs - Iterable (by `Cheerio.each`) list of href attributes.
 * @returns {Set<URL>} - Filtered list of URLs.
 */
module.exports = (page, hrefs) => {
  const filteredUrls = new Set();
  hrefs.each((i, href) => {
    // TODO: remove hash?
    const url = new URL(href, page);
    if (url.origin === page.origin) {
      // non-external urls
      filteredUrls.add(url);
    }
  });
  return filteredUrls;
};
