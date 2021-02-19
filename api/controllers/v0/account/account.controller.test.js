const supertest = require('supertest');
const { mongoose, AccountModel } = require('node-mongoose-models');
const testDB = require('../../../../test/test-db')(mongoose);
const { verifyToken, signToken } = require('../../../../components/auth/auth.service');
const requestLogin = require('../../../../test/request-login');
const app = require('../../../../index');
const { userErrors } = require('../../../../errors');

const user1 = {
  username: 'test',
  password: 'aabbccdd1234',
};

describe('AccountController', () => {
  beforeAll(() => testDB.connect());
  afterAll(() => testDB.disconnect());

  describe('POST /account/login', () => {
    beforeAll(async () => {
      await AccountModel.create(user1);
    });

    describe('No se envía ni usuario ni contraseña', () => {
      let response;

      beforeAll(done => {
        supertest(app)
          .post('/account/login')
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

    describe('Falla porque no se envía contraseña', () => {
      let response;

      beforeAll(done => {
        supertest(app)
          .post('/account/login')
          .send({ username: user1.username })
          .end((err, res) => {
            response = res;
            done();
          });
      });

      test('Devería devolver un 401', () => {
        expect(response.status)
          .toEqual(401);
      });
    });

    describe('Envía una contraseña incorrecta', () => {
      let response;

      beforeAll(done => {
        supertest(app)
          .post('/account/login')
          .send({
            username: user1.username,
            password: 'wrongpassword',
          })
          .end((err, res) => {
            response = res;
            done();
          });
      });

      test('Devería devolver un 401', () => {
        expect(response.status)
          .toEqual(401);
      });
    });

    describe('Envía una contraseña correcta', () => {
      let response;

      beforeAll(done => {
        const { username, password } = user1;
        supertest(app)
          .post('/account/login')
          .send({
            username,
            password,
          })
          .end((err, res) => {
            response = res;
            done();
          });
      });

      test('Devería devolver un 200', () => {
        expect(response.status)
          .toEqual(200);
      });

      test('Genera un token válido', async () => {
        const dataToken = await verifyToken(JSON.parse(response.text).token);
        expect(dataToken.user)
          .toEqual(user1.username);
      });
    });
  });

  describe('POST /account/me', () => {
    beforeAll(async () => {
      await AccountModel.create(user1);
    });

    describe('No se envía token', () => {
      let response;

      beforeAll(done => {
        supertest(app)
          .get('/account/me')
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

    describe('Se envía un token inválido', () => {
      let response;

      beforeAll(done => {
        supertest(app)
          .get('/account/me')
          .set('Authorization', 'dd')
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

    describe('Se envía un token expirado', () => {
      let response;

      beforeAll(done => {
        supertest(app)
          .get('/account/me')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWR1IiwiaWF0IjoxNjEzNjk1ODM1LCJleHAiOjE2MTM3MDMwMzV9.ZQxC-1OlQa-zIfUZJQsaYWyrzp_qjXUQGN-FDHNiOR4')
          .end((err, res) => {
            response = res;
            done();
          });
      });

      test('Dvuelve el mensaje "El token ha expirado"', () => {
        expect(response.body.message)
          .toBe(new userErrors.ExpiredToken().message);
      });

      test('Debería dar un 401', () => {
        expect(response.statusCode)
          .toBe(401);
      });
    });

    describe('El usuario del token no existe', () => {
      let response;

      beforeAll(done => {
        const invalidToken = signToken('invalid');
        supertest(app)
          .get('/account/me')
          .set('Authorization', `Bearer ${invalidToken}`)
          .end((err, res) => {
            response = res;
            done();
          });
      });

      test('Dvuelve el mensaje "El token ha expirado"', () => {
        expect(response.body.message)
          .toBe(new userErrors.InvalidToken().message);
      });

      test('Debería dar un 401', () => {
        expect(response.statusCode)
          .toBe(401);
      });
    });

    describe('Se envía un token correcto', () => {
      let response;

      beforeAll(done => {
        const { username, password } = user1;
        let token;
        supertest(app)
          .post('/account/login')
          .send({
            username,
            password,
          })
          .end((err, res) => {
            token = JSON.parse(res.text).token;
            supertest(app)
              .get('/account/me')
              .set('Authorization', `Bearer ${token}`)
              .end((err2, res2) => {
                response = res2;
                done();
              });
          });
      });

      test('Devuelve un token', () => {
        expect(response.headers.token)
          .toBeTruthy();
      });

      test('Debería dar un 204', () => {
        expect(response.statusCode)
          .toBe(204);
      });
    });
  });
  describe('POST /account/createAccount', () => {
    describe('Usuario no autenticado', () => {
      let response;

      beforeAll(done => {
        supertest(app)
          .post('/account/createAccount')
          .send({
            username: 'tessst',
            password: 'passss',
          })
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
      before(done => {
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

      describe('Crea un usuario correctamente', () => {
        let response;

        beforeAll(done => {
          supertest(app)
            .post('/account/createAccount')
            .set('Authorization', `Bearer ${token}`)
            .send({
              username: 'tessst',
              password: 'passss',
            })
            .end((err, res) => {
              response = res;
              done();
            });
        });

        test('Debería dar un 201', async () => {
          expect(token)
            .toBeTruthy();
          expect(response.statusCode)
            .toBe(201);
        });
      });

      describe('Intenta crea un usuario sin password', () => {
        let response;

        beforeAll(done => {
          supertest(app)
            .post('/account/createAccount')
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'tessst' })
            .end((err, res) => {
              response = res;
              done();
            });
        });

        test('Debería dar un 422', () => {
          expect(response.statusCode)
            .toBe(422);
        });
      });

      describe('No se manda usuario ni contraseña', () => {
        let response;

        beforeAll(done => {
          supertest(app)
            .post('/account/createAccount')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              response = res;
              done();
            });
        });

        test('Debería dar un 400', () => {
          expect(response.statusCode)
            .toBe(422);
        });
      });
    });
  });
});
