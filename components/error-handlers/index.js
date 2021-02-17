const Boom = require('@hapi/boom');
const LogService = require('../../api/services/log.service');

const logService = new LogService('Error');

/**
 * Send a Boom.badData error
 */
function sendValidationError(res) {
  return err => {
    const { statusCode, payload } = Boom.badData(err.message).output;
    res.status(statusCode).send(payload);
    logService.logInfo(`[Error] - ${payload.message}- ${payload.message}`);
  };
}

function sendResourceFailedError(res) {
  return err => {
    const { statusCode, payload } = Boom.failedDependency(err.message).output;
    res.status(statusCode).send(payload);
    logService.logInfo(`[Error] - ${payload.message}`);
  };
}

/**
 * Send a Boom error
 */
/* istanbul ignore next */
function sendError(res, code) {
  return err => {
    const { statusCode, payload } = Boom.boomify(err, { statusCode: code }).output;

    payload.message = err.message || payload.message;
    payload.name = err.name || payload.error;
    res.status(statusCode).send(payload);

    const logMessage = `${payload.message || payload.error || 'Unknow error'} :`;
    console.error(logMessage, err, err.stack);
  };
}

function sendUnauthorizedError(res) {
  return err => {
    const { statusCode, payload } = Boom.unauthorized(err.message).output;
    res.status(statusCode).send(payload);
    logService.logInfo(`[Error] - ${payload.message}`);
  };
}

/**
 * Send a 404 not found
 */
function sendNotFound(res) {
  return err => {
    const { statusCode, payload } = Boom.notFound(err.message).output;
    res.status(statusCode).send(payload);
    logService.logInfo(`[Error] - ${payload.message}`);
  };
}

/**
 * Send a Boom.forbidden error
 */
function sendForbidden(res) {
  return err => {
    const { statusCode, payload } = Boom.forbidden(err.message).output;
    res.status(statusCode).send(payload);
    logService.logInfo(`[Error] - ${payload.message}`);
  };
}

/**
 * Send a Boom.badRequest error
 */
function sendBadRequest(res) {
  return err => {
    const { statusCode, payload } = Boom.badRequest(err.message).output;
    res.status(statusCode).send(payload);
    logService.logInfo(`[Error] - ${payload.message}`);
  };
}

/**
 * Send a Boom.conflict error
 */
function sendConflict(res) {
  return err => {
    const { statusCode, payload } = Boom.conflict(err.message).output;
    res.status(statusCode).send(payload);
    logService.logInfo(`[Error] - ${payload.message}`);
  };
}

function sendNotAcceptable(res) {
  return err => {
    const { statusCode, payload } = Boom.notAcceptable(err.message).output;
    res.status(statusCode).send(payload);
    logService.logInfo(`[Error] - ${payload.message}`);
  };
}

module.exports = {
  sendError,
  sendValidationError,
  sendResourceFailedError,
  sendUnauthorizedError,
  sendNotFound,
  sendForbidden,
  sendBadRequest,
  sendConflict,
  sendNotAcceptable,
};
