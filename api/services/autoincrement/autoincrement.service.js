/* eslint-disable nonblock-statement-body-position */
const { AutoIncrement } = require('node-mongoose-models');

const LogService = require('../log.service');

const TYPE = 'AutoIncrementService';
const logService = new LogService(TYPE);

/**
 * Decrement invoice nOrder
 * @return {Promise<string>}
 */
const decrementExampleKey = () =>  AutoIncrement.decrease('key');

module.exports = {
  decrementExampleKey,
};
