const corsMiddleware = require('./cors');
const helmetMiddleware = require('./helmet');
const bodyParserMiddleware = require('./body-parser');

module.exports = (app) => {
  corsMiddleware(app);
  helmetMiddleware(app);
  bodyParserMiddleware(app);
};
