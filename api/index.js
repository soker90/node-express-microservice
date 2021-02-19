const routes = require('./controllers');
const buildRouter = require('./build-router');

module.exports = async app => {
  const router = buildRouter(routes, []);
  app.use('/', router);

  app.get('/monit/health', (req, res) => res.send('OK'));
};
