const config = {
  port: 3008,
  session: {
    secret: 'my-secret',
    timeout: '2h',
  },
  mongo: {
    user: process.env.DATABASE_ROOT_USERNAME || '',
    pass: process.env.DATABASE_ROOT_PASSWORD || '',
    port: ['27017'],
    host: [process.env.DATABASE_HOST || '127.0.0.1'],
    dataBaseName: process.env.DATABASE_NAME || 'myBbdd',
  },
};

module.exports = config;
