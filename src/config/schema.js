/**
 * Schema used for parsing the configuration
 *
 * @module config/schema
 */
const plainString = {
  format: String,
  default: '',
};
const schema = {
  before: {
    url: plainString,
  },
  after: {
    url: plainString,
  },
  settings: {
    depth: {
      format: Number,
      default: 3,
    },
  },
  command: {
    directory: plainString,
    name: {
      format: String,
      default: '',
    },
    options: {
      target: plainString,
      store: plainString,
      usepaths: plainString,
    },
  },
};

module.exports = schema;
