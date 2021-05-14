/**
 * Default page visit tracker callback.
 *
 * @module api/tracker/default-tracker
 */

/**
 * @function defaultTracker
 *
 *
 * Returns default tracker callback. Only tracks if the page has been visited.
 *
 * @returns {function} - tracker callback.
 */
const defaultTracker = () => {
  const visitedUrls = new Set();

  /**
   * @function
   * Tracker callback function.
   * @param {URL} visitedUrl - the URL to track.
   * @returns {boolean} - `true` if URL has been visited, `false` otherwise.
   */
  return (visitedUrl) => {
    if (visitedUrls.has(visitedUrl.href)) {
      return true;
    }
    visitedUrls.add(visitedUrl.href);
    return false;
  };
};

module.exports = defaultTracker;
