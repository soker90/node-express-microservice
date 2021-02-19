global.Promise = require('bluebird');
global.context = describe;
global.before = beforeAll;
global.after = afterAll;

if (!process.env.LOG) {
  global.console.log = jest.fn();
  global.console.error = jest.fn();
}
