/**
 * Schema used for parsing the configuration
 *
 * @module config/schema
 */
const schema = {
  before: {
    url: {
      format: String,
      default: '',
    },
  },
  after: {
    url: {
      format: String,
      default: '',
    },
  },
  settings: {
    depth: {
      format: Number,
      default: 3,
    },
  },
};

module.exports = schema;
