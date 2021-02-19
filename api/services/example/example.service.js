/* eslint-disable nonblock-statement-body-position */
const {
  ExampleModel,
} = require('node-mongoose-models');

const examples = require('./services/examples');
const example = require('./services/example');

module.exports = {
  examples,
  example,
};
