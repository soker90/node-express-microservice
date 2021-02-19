const {
  ExampleModel,
} = require('node-mongoose-models');

/**
 * Get all examples
 * @returns {Promise<*>}
 */
const example = ({ id }) => ExampleModel.findOne({ _id: id });

module.exports = example;
