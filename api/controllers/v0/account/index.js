const { authMiddleware } = require('../../../../components/auth');
const errorHandler = require('../../../../components/error-handlers');

const AccountController = require('./account.controller');

module.exports = ({ accountService }) => {
  const accountController = new AccountController({
    errorHandler,
    accountService,
  });

  return [{
    method: 'post',
    domain: 'account',
    path: '/login',
    handler: accountController.auth,
    bindTo: accountController,
    skipVersion: true,
  }, {
    method: 'get',
    domain: 'account',
    path: '/me',
    handler: accountController.me,
    bindTo: accountController,
    skipVersion: true,
    middlewares: [
      authMiddleware,
    ],
  }, {
    method: 'post',
    domain: 'account',
    path: '/createAccount',
    handler: accountController.createAccount,
    bindTo: accountController,
    skipVersion: true,
    middlewares: [
      authMiddleware,
    ],
  }];
};
