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
    default: 3,
    describe: 'Depth of crawl.',
    type: 'number',
  },
  target: {
    choices: ['before', 'after'],
    default: 'before',
    describe: 'Crawl the `before` or the `after` site.',
    type: 'string',
  },
  store: {
    choices: ['pages', 'paths'],
    default: 'pages',
    describe: 'Store the crawled pages to cache, or `paths.txt`.',
    type: 'string',
  },
  usepaths: {
    default: false,
    describe: 'Use `paths.txt` instead of crawling links on page.',
    type: 'boolean',
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
  config.set('command.name', 'crawl');
  config.set('command.options', {
    target: argv.target,
    store: argv.store,
    usepaths: argv.usepaths,
  });
  crawlApi(config);
};
