/* eslint-disable import/no-extraneous-dependencies */
const supertest = require('supertest');
const { AccountModel } = require('node-mongoose-models');

const defaultCredentials = {
  username: `test ${Math.random() * 20}`,
  password: 'AabbCcdD1234',
};

const defaultApp = require('../..');

const createUser = user => AccountModel.create(user);

const requestLogin = (app = defaultApp, credentials = defaultCredentials) => (
  createUser(credentials).then(() => (
    supertest(app)
      .post('/account/login')
      .send({
        username: credentials.username,
        password: credentials.password,
      })
      .then(res => res.body.token)))
);

requestLogin.defaultCredentials = defaultCredentials;
module.exports = requestLogin;
