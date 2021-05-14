/**
 * @module configLoader
 *
 * Config object loader.
 */
const convict = require('convict');
const yaml = require('js-yaml');

const schema = require('./schema');

/**
 * @function configLoader
 * Load, parse and validate configuration in the specified directory.
 * Filename is assumed to by `config.yaml`.
 *
 * @param {string} directory - Directory containing the config file.
 * @returns {convict} - configuration object.
 */
const configLoader = (directory) => {
  const config = convict(schema);
  convict.addParser({ extension: ['yml', 'yaml'], parse: yaml.load });
  config.loadFile(`${process.cwd()}/${directory}/config.yaml`).validate();
  config.set('command.directory', directory);
  return config;
};

module.exports = configLoader;
