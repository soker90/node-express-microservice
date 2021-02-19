const { ExampleModel } = require('node-mongoose-models');
const { exampleErrors } = require('../../../errors');

/**
 * Check if id is valid
 * @param {String} id
 * @returns {boolean}
 */
const validateId = async ({ id }) => {
  const exampleExist = await ExampleModel.exists({ _id: id });
  if (!exampleExist) throw new exampleErrors.ExampleIdNotFound();
};

module.exports = {
  validateId,
};
