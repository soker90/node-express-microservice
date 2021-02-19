const UserErrors = require('./user.errors');

describe('UserErrors', () => {
  test('should be an object', () => {
    expect(UserErrors).toBeInstanceOf(Object);
  });

  describe('InvalidLogin', () => {
    test('should exist and extend from Error', () => {
      expect(new UserErrors.InvalidLogin()).toBeInstanceOf(Error);
    });

    test('should define a default message', () => {
      const err = new UserErrors.InvalidLogin();
      expect(err.message).toEqual('Usuario o contraseña incorrecto');
    });

    test('should allow passing a custom message', () => {
      const err = new UserErrors.InvalidLogin('CustomMessage');
      expect(err.message).toEqual('CustomMessage');
    });
  });


  describe('UserNotFound', () => {
    test('should exist and extend from Error', () => {
      expect(new UserErrors.UserNotFound()).toBeInstanceOf(Error);
    });

    test('should define a default message', () => {
      const err = new UserErrors.UserNotFound();
      expect(err.message).toEqual('Usuario no encontrado');
    });

    test('should allow passing a custom message', () => {
      const err = new UserErrors.UserNotFound('CustomMessage');
      expect(err.message).toEqual('CustomMessage');
    });
  });

  describe('UserExist', () => {
    test('should exist and extend from Error', () => {
      expect(new UserErrors.UserExist()).toBeInstanceOf(Error);
    });

    test('should define a default message', () => {
      const err = new UserErrors.UserExist();
      expect(err.message).toEqual('El usuario ya existe');
    });

    test('should allow passing a custom message', () => {
      const err = new UserErrors.UserExist('CustomMessage');
      expect(err.message).toEqual('CustomMessage');
    });
  });

  describe('ExpiredToken', () => {
    test('should exist and extend from Error', () => {
      expect(new UserErrors.ExpiredToken()).toBeInstanceOf(Error);
    });

    test('should define a default message', () => {
      const err = new UserErrors.ExpiredToken();
      expect(err.message).toEqual('El token ha expirado');
    });

    test('should allow passing a custom message', () => {
      const err = new UserErrors.ExpiredToken('CustomMessage');
      expect(err.message).toEqual('CustomMessage');
    });
  });
});
