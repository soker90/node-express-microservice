const supertest = require('supertest');
const {
  mongoose,
  ExampleModel,
} = require('node-mongoose-models');
const testDB = require('../../../../test/test-db')(mongoose);
const requestLogin = require('../../../../test/request-login');
const app = require('../../../../index');
const {
  exampleErrors,
} = require('../../../../errors');

const exampleMock = {
  myNumber: 2020,
  myString: 'hello',
};

describe('ExamplesController', () => {
  beforeAll(() => testDB.connect());
  afterAll(() => testDB.disconnect());

  describe('GET /examples', () => {
    const PATH = '/examples';

    describe('No examples', () => {
      let response;

      before(done => {
        supertest(app)
          .get(PATH)
          .end((err, res) => {
            response = res;
            done();
          });
      });

      test('Debería dar un 200', () => {
        expect(response.status)
          .toBe(200);
      });

      test('Devuelve un array vacío', () => {
        expect(response.body.length)
          .toBe(0);
      });
    });

    describe('Have examples', () => {
      let response;

      before(() => ExampleModel.create(exampleMock));

      before(done => {
        supertest(app)
          .get(PATH)
          .end((err, res) => {
            response = res;
            done();
          });
      });

      test('Debería dar un 200', () => {
        expect(response.status)
          .toBe(200);
      });

      test('Los datos son correctos', () => {
        const responseData = response.body[0];
        expect(responseData.myNumber)
          .toBe(exampleMock.myNumber);
        expect(responseData.myString)
          .toBe(exampleMock.myString);
      });
    });
  });

  describe('GET /examples/:id', () => {
    const PATH = id => `/examples/${id}`;
    describe('Usuario no autenticado', () => {
      let response;

      beforeAll(done => {
        supertest(app)
          .get(PATH(2000))
          .end((err, res) => {
            response = res;
            done();
          });
      });

      test('Debería dar un 401', () => {
        expect(response.statusCode)
          .toBe(401);
      });
    });

    describe('Usuario autenticado', () => {
      let token;

      beforeAll(done => {
        requestLogin()
          .then(res => {
            token = res;
            done();
          });
      });

      test('Se ha autenticado el usuario', () => {
        expect(token)
          .toBeTruthy();
      });

      describe('Id is not found', () => {
        let response;

        beforeAll(done => {
          supertest(app)
            .get(PATH('5f5b3fa97f107b00128dde24'))
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              response = res;
              done();
            });
        });

        test('Debería dar un 400', () => {
          expect(response.status)
            .toBe(404);
        });

        test('El mensaje de error es correcto', () => {
          expect(response.body.message)
            .toBe(new exampleErrors.ExampleIdNotFound().message);
        });
      });

      describe('Success request', () => {
        let response;
        let example;

        before(() => ExampleModel.create(exampleMock)
          .then(exampleCreated => {
            example = exampleCreated;
          }));

        beforeAll(done => {
          supertest(app)
            .get(PATH(example._id))
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              response = res;
              done();
            });
        });

        test('Debería dar un 200', () => {
          expect(token)
            .toBeTruthy();
          expect(response.status)
            .toBe(200);
        });

        test('Its success', () => {
          expect(response.body.example)
            .toBe(`${exampleMock.myNumber} - ${exampleMock.myString}`);
        });
      });
    });
  });
});
