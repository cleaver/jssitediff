/**
 * Process CLI options for `crawl` command.
 *
 * @module commands/crawl
 */

const crawlApi = require('../api/crawl');
const configLoader = require('../config/configLoader');
const { globalOpts } = require('../config/options');

exports.command = 'crawl';
exports.desc = 'Crawl a website.';
exports.builder = {
  ...globalOpts,
  depth: {
    type: 'number',
  },
  target: {
    choices: ['before', 'after'],
    default: 'before',
    type: 'string',
  },
  store: {
    choices: ['pages', 'paths'],
    default: 'pages',
    type: 'string',
  },
};

/**
 * Command handler for `yargs` command.
 *
 * @param {array} argv - parsed and validated command options.
 */
exports.handler = (argv) => {
  const config = configLoader(argv.directory);
  // ensure `depth` is in config or supplied as option.
  if (typeof argv.depth === 'number') {
    config.set('settings.depth', argv.depth);
  } else if (!config.has('settings.depth')) {
    throw new Error('`depth` must be set in config or command line.');
  }
  config.set('command', {
    name: 'crawl',
    options: {
      target: argv.target,
      store: argv.store,
    },
  });
  crawlApi(config);
};
