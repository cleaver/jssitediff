/**
 * Default page visit tracker callback.
 *
 * @module api/tracker/default-tracker
 */

const visitedUrls = new Set();

/**
 * @function defaultTracker
 *
 * Default tracker callback. Only tracks if the page has been visited.
 *
 * @param {URL} visitedUrl - the URL to track.
 * @returns {boolean} - `true` if URL has been visited, `false` otherwise.
 */
const defaultTracker = (visitedUrl) => {
  if (visitedUrls.has(visitedUrl.href)) {
    return true;
  }
  visitedUrls.add(visitedUrl.href);
  return false;
};

module.exports = defaultTracker;
