const ExampleErrors = require('./example.errors');

describe('ExampleErrors', () => {
  test('should be an object', () => {
    expect(ExampleErrors)
      .toBeInstanceOf(Object);
  });

  describe('ExampleErrors', () => {
    test('should exist and extend from Error', () => {
      expect(new ExampleErrors.ExampleIdNotFound())
        .toBeInstanceOf(Error);
    });

    test('should define a default message', () => {
      const err = new ExampleErrors.ExampleIdNotFound();
      expect(err.message)
        .toEqual('Example not found');
    });

    test('should allow passing a custom message', () => {
      const err = new ExampleErrors.ExampleIdNotFound('CustomMessage');
      expect(err.message)
        .toEqual('CustomMessage');
    });
  });
});
