/* eslint-disable max-classes-per-file */

class ExampleIdNotFound extends Error {
  /**
   * Create an instance
   *
   * @param {string} [msg=Example not found] Message for the error
   */
  constructor(msg = 'Example not found') {
    super(msg);
    this.name = this.constructor.name;
  }
}

module.exports = {
  ExampleIdNotFound,
};
