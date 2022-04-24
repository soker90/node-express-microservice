/* eslint-disable import/no-extraneous-dependencies */
const NodeEnvironment = require('jest-environment-node');
const { MongoMemoryServer } = require('mongodb-memory-server');

class MongoDbEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.mongod = null;
  }

  async setup() {
    await super.setup();
    this.mongod = await MongoMemoryServer.create();

    this.global.__MONGO_URI__ = this.mongod.getUri();
    this.global.__MONGO_DB_NAME__ = this.mongod.dbName;
    // this is used to have different names for documents created while testing
    this.global.__COUNTERS__ = {
      user: 0,
    };
  }

  async teardown() {
    await super.teardown();
    await this.mongod.stop();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoDbEnvironment;