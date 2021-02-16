const express = require('express');

const app = express();

require('./config/db')();
require('./config/express/pre')(app);
require('./api')(app);

module.exports = app;
