/**
 * Get storage directory.
 *
 * @module util/getStorageDir
 */
const fs = require('fs');
const { sep } = require('path');

/**
 * @function getStorageDir
 *
 * Prepare and return the target directory path.
 * Ensures that directory exists and is empty.
 *
 * @param {convict} config - configuration object.
 * @returns {string} the target directory.
 */
const getStorageDir = (config) => {
  const configDir = config.get('command.directory');
  const snapshotDir = [process.cwd(), sep, configDir, sep, 'snapshot'].join('');
  if (!fs.existsSync(snapshotDir)) {
    fs.mkdirSync(snapshotDir);
  }
  const targetDir = [
    snapshotDir,
    sep,
    config.get('command.options.target'),
  ].join('');
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }
  fs.mkdirSync(targetDir);
  return targetDir;
};

module.exports = getStorageDir;
