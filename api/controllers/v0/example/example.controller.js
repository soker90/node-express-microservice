const Promise = require('bluebird');

const LogService = require('../../../services/log.service');

const TYPE = 'ExampleController';

const logService = new LogService(TYPE);

class ExamplesController {
  constructor({
    exampleService,
    errorHandler,
    exampleValidator,
    exampleAdapter,
  }) {
    this.exampleService = exampleService;
    this.errorHandler = errorHandler;
    this.exampleValidator = exampleValidator;
    this.exampleAdapter = exampleAdapter;
  }

  _handleError(res, error) {
    switch (error.name) {
    case 'ExampleIdNotFound':
      this.errorHandler.sendNotFound(res)(error);
      break;
      /* istanbul ignore next */
    default:
      this.errorHandler.sendError(res)(error);
      break;
    }
  }

  /**
   * Return all examples
   */
  examples(req, res) {
    logService.logInfo('[examples] - List examples');
    Promise.resolve(req)
      .then(this.exampleService.examples)
      .then(data => res.send(data))
      .catch(this._handleError.bind(this, res));
  }

  /**
   * Return example data
   */
  examples(req, res) {
    logService.logInfo('[example] - Get example');
    Promise.resolve(req.params)
      .tap(this.exampleValidator.validateId)
      .then(this.exampleService.example)
      .then(this.exampleAdapter.expampleResponse)
      .then(data => res.send(data))
      .catch(this._handleError.bind(this, res));
  }

}

module.exports = ExamplesController;
