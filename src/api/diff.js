/**
 * API for `diff` operations.
 *
 * @module api/diff
 */
const diffHandler = require('./handlers/diff');
const diffStorage = require('./storage/diff-storage');
const defaultPreprocessor = require('./dom/default-preprocessor');
const readPaths = require('./tracker/read-paths');

/**
 * @callback storeDiffCallback
 * Callback to store a diff.
 *
 * @param {string} path - Path of the diff to store.
 * @param {Cheerio} page - Page parsed by Cheerio.
 */
/**
 * @function diff
 * Find differences between before and after versions of specified pages.
 *
 * @param {convict} config - Configuration object for the diff.
 * @param {preprocessCallback} preprocessCb - DOM preprocessing callback.
 * @param {storeDiffCallback} storeDiffCb - Optional. Callback to store a diff.
 */
const diff = (config, preprocessCb = null, storeDiffCb = null) => {
  let preprocessor = preprocessCb;
  // default preprocess callback
  if (typeof preprocessor !== 'function') {
    preprocessor = defaultPreprocessor;
  }
  let storeDiff = storeDiffCb;
  // default storeDiff callback
  if (typeof storeDiff !== 'function') {
    storeDiff = diffStorage(config);
  }

  // call it!
  const pathUrls = readPaths(config); // get the paths
  pathUrls.forEach((pathUrl) => {
    diffHandler(pathUrl, 0, storeDiff);
  });
};

module.exports = diff;
