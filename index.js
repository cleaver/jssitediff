// eslint-disable-next-line no-unused-expressions
require('yargs/yargs')(process.argv.slice(2))
  .commandDir('src/commands')
  .demandCommand()
  .help().argv;
