const {
  ExampleModel,
} = require('node-mongoose-models');

/**
 * Get all examples
 * @returns {Promise<*>}
 */
const examples = () => ExampleModel.find({});

module.exports = examples;
