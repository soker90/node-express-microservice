const services = require('../../services');
const validators = require('../../validators');
const adapters = require('../../adapters');

const AccountController = require('./account');
const ExampleController = require('./example');

module.exports = [
  ...AccountController(services),
  ...ExampleController(services, validators, adapters),
];
