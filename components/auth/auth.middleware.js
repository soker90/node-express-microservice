const { AccountModel } = require('arroyo-erp-models');
const errorHandlers = require('../error-handlers');
const { verifyToken, signToken } = require('./auth.service');
const { ExpiredToken, InvalidToken } = require('../../errors/user.errors');

/**
 * Returns the token in the response
 * @param {Object} res
 * @param {String} username
 */
const refreshToken = (res, { user }) => {
  res.set(
    'Token', signToken(user),
  );
  res.set('Access-Control-Expose-Headers', '*, Token');
};

const handleVerifyTokenError = res => error => {
  switch (error.name) {
  case 'TokenExpiredError':
    errorHandlers.sendUnauthorizedError(res)(new ExpiredToken());
    break;
  default:
    errorHandlers.sendUnauthorizedError(res)(error);
  }
};

/**
 * checkAuthorization
 *
 * req.headers.authorization - The value from the header Authorization: Bearer <token>
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const checkAuthorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')?.[1];
    if (!token) throw new InvalidToken();
    const dataToken = await verifyToken(token);
    const userExist = await AccountModel.exists({ username: dataToken?.user });

    if (userExist) refreshToken(res, dataToken);
    else throw new InvalidToken();

    next();
  } catch (error) {
    handleVerifyTokenError(res)(error);
  }
};

// Authentication middleware
module.exports = checkAuthorization;
