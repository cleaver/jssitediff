/**
 * Page visit tracker callback for storing `paths.txt`.
 *
 * @module api/tracker/paths-tracker
 */
const fs = require('fs');

/**
 * @function pathsTracker
 *
 * Tracker callback. Tracks if the page has been visited
 * and records in `paths.txt`.
 *
 * @param {URL} visitedUrl - the URL to track.
 */
const pathsTracker = (config) => {
  const visitedUrls = new Set();
  // open file to overwrite
  const directory = config.get('command.directory');
  const fd = fs.openSync(`${process.cwd()}/${directory}/paths.txt`, 'w');

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
    fs.writeSync(fd, `${visitedUrl.pathname}\n`);
    return false;
  };
};

module.exports = pathsTracker;
