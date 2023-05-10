/**
 * Process CLI options for `diff` command.
 *
 * @module commands/diff
 */

const diffApi = require('../api/diff');
const configLoader = require('../config/configLoader');
const { globalOpts } = require('../config/options');

exports.command = 'diff';
exports.desc = 'Diff a the before and after versions of the website.';
exports.builder = {
  ...globalOpts,
};

/**
 * Command handler for `yargs` command.
 *
 * @param {array} argv - parsed and validated command options.
 */
exports.handler = (argv) => {
  const config = configLoader(argv.directory);
  config.set('command.name', 'diff');
  diffApi(config);
};
