const errorHandlers = require('.');

const message = 'Test error';

function _getMockResponse() {
  return {
    status(statusCode) {
      this.statusCode = statusCode;
      return this;
    },
    send(payload) {
      this.payload = payload;
    },
  };
}

describe('Error handlers', () => {
  describe('sendError', () => {
    const mockRes = _getMockResponse();

    beforeAll(() => {
      errorHandlers.sendError(mockRes)(new Error('test'));
    });

    test('It should contain an statusCode of 500', () => {
      expect(mockRes.statusCode).toBe(500);
    });

    test('It should contain a payload with an error message', () => {
      expect(mockRes.payload.error).toBe('Internal Server Error');
      expect(mockRes.payload.message).toBe('test');
    });
  });

  describe('sendResourceFailedError', () => {
    const mockRes = _getMockResponse();

    beforeAll(() => {
      errorHandlers.sendResourceFailedError(mockRes)(message);
    });

    test('It should contain an statusCode of 424', () => {
      expect(mockRes.statusCode).toBe(424);
    });

    test('It should contain a payload with an error message', () => {
      expect(mockRes.payload.error).toBe('Failed Dependency');
      expect(mockRes.payload.message).toBe('Failed Dependency');
    });
  });

  describe('sendValidationError', () => {
    const mockRes = _getMockResponse();

    beforeAll(() => {
      errorHandlers.sendValidationError(mockRes)(message);
    });

    test('It should contain an statusCode of 422', () => {
      expect(mockRes.statusCode).toBe(422);
    });

    test('It should contain a payload with an error message', () => {
      expect(mockRes.payload.error).toBe('Unprocessable Entity');
      expect(mockRes.payload.message).toBe('Unprocessable Entity');
    });
  });

  describe('sendForbidden', () => {
    const mockRes = _getMockResponse();

    beforeAll(() => {
      errorHandlers.sendForbidden(mockRes)(message);
    });

    test('It should contain an statusCode of 403', () => {
      expect(mockRes.statusCode).toBe(403);
    });

    test('It should contain a payload with an error message', () => {
      expect(mockRes.payload.error).toBe('Forbidden');
      expect(mockRes.payload.message).toBe('Forbidden');
    });
  });

  describe('sendConflict', () => {
    const mockRes = _getMockResponse();

    beforeAll(() => {
      errorHandlers.sendConflict(mockRes)(message);
    });

    test('It should contain an statusCode of 409', () => {
      expect(mockRes.statusCode).toBe(409);
    });

    test('It should contain a payload with an error message', () => {
      expect(mockRes.payload.error).toBe('Conflict');
      expect(mockRes.payload.message).toBe('Conflict');
    });
  });

  describe('sendNotAcceptable', () => {
    const mockRes = _getMockResponse();

    beforeAll(() => {
      errorHandlers.sendNotAcceptable(mockRes)(message);
    });

    test('It should contain an statusCode of 406', () => {
      expect(mockRes.statusCode).toBe(406);
    });

    test('It should contain a payload with an error message', () => {
      expect(mockRes.payload.error).toBe('Not Acceptable');
      expect(mockRes.payload.message).toBe('Not Acceptable');
    });
  });
});
