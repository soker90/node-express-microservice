const supertest = require('supertest');

const app = require('..');

describe('Monit connection', () => {
  describe('GET /monit/health', () => {
    let response;
    beforeAll(done => {
      supertest(app)
        .get('/monit/health')
        .then(res => {
          response = res;
          done();
        });
    });
    test('Responde con un 200', () => {
      expect(response.statusCode).toBe(200);
    });

    test('Responde con un OK', () => {
      expect(response.text).toBe('OK');
    });
  });
});
