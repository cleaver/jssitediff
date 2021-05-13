const convict = require('convict');
const yaml = require('js-yaml');

const schema = require('./schema');

const configLoader = (directory) => {
  const config = convict(schema);
  convict.addParser({ extension: ['yml', 'yaml'], parse: yaml.load });
  config.loadFile(`${process.cwd()}/${directory}/config.yaml`).validate();
  return config;
};

module.exports = configLoader;
