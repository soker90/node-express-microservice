/**
 * Return adapted object with example data
 * @param example
 * @returns {{example: string}}
 */
const exampleResponse = example => ({
  example: `${example.mmyNumber} - ${example.myString}`
});

module.exports = {
  exampleResponse,
};
