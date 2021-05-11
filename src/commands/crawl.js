const crawler = require('../api/crawl-api');

exports.command = 'crawl <path>';
exports.desc = 'Crawl a website.';
exports.builder = {
  depth: {
    default: 3,
  },
  store: {
    choices: ['before', 'after', 'paths'],
    default: 'before',
    type: 'string',
  },
};
exports.handler = (argv) => {
  crawler(argv.path, argv.depth);
};
