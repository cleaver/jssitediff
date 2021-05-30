const fs = require('fs');
const { sep } = require('path');

const readPaths = (config) => {
  const configDir = [process.cwd(), config.get('command.directory')].join(sep);
  const target = config.get('command.options.target');
  const targetSite = config.get(target).url;
  const filename = [configDir, 'paths.txt'].join(sep);
  if (!fs.existsSync(filename)) {
    throw new Error(`Missing file: ${filename}`);
  }
  const pathsFile = fs.readFileSync(filename, { encoding: 'utf8' });
  return pathsFile.split(/\r\n|\r|\n/).map((path) => new URL(path, targetSite));
};

module.exports = readPaths;
