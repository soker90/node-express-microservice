const Promise = require('bluebird');

const LogService = require('../../../services/log.service');

const TYPE = 'AccountController';

const logService = new LogService(TYPE);

class AccountController {
  constructor({
    accountService,
    errorHandler,
  }) {
    this.accountService = accountService;
    this.errorHandler = errorHandler;
  }

  _handleError(res, error) {
    switch (error.name) {
    case 'InvalidLogin':
    case 'UserNotFound':
      this.errorHandler.sendUnauthorizedError(res)(error);
      break;
    case 'UserExist':
    case 'InvalidPassword':
      this.errorHandler.sendValidationError(res)(error);
      break;
    /* istanbul ignore next */
    default:
      this.errorHandler.sendError(res)(error);
      break;
    }
  }

  /**
   * Login in app
   * @return {{token: string}}
   */
  auth(req, res) {
    logService.logInfo(`[login] - Login user ${req.body.username}`);
    Promise.resolve(req.body)
      .bind(this)
      .then(this.accountService.login)
      .then(data => res.status(200).send(data))
      .catch(this._handleError.bind(this, res));
  }

  /**
   * Check token
   */
  me(req, res) {
    logService.logInfo('[login] - Login user with token');
    Promise.resolve(req.body)
      .bind(this)
      .then(() => res.status(204).send())
      .catch(this._handleError.bind(this, res));
  }

  /**
   * Create account
   */
  createAccount(req, res) {
    logService.logInfo(`[createAccount] - Create new account ${req.body.username}`);
    Promise.resolve(req.body)
      .bind(this)
      .then(this.accountService.createAccount)
      .then(() => res.status(201).send())
      .catch(this._handleError.bind(this, res));
  }
}

module.exports = AccountController;
