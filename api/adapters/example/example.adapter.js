/**
 * Return adapted object with example data
 * @param example
 * @returns {{example: string}}
 */
const exampleResponse = example => ({
  example: `${example.myNumber} - ${example.myString}`,
});

module.exports = {
  exampleResponse,
};
