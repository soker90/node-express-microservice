const { sign, verify } = require('jsonwebtoken');

const { secret, timeout } = require('../../config').session;

/**
 * Creates a JWT token
 *
 * @param {object} user
 */
const signToken = user => sign({ user }, secret, { expiresIn: timeout });

/**
 * Verifies a JWT token
 *
 * @param {string} token
 */
const verifyToken = async token => verify(token, secret);

module.exports = {
  signToken,
  verifyToken,
};
