const mongooseOpts = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = mongoose => {
  async function connect() {
    await mongoose.connect(__MONGO_URI__, mongooseOpts);

    /* istanbul ignore next */
    mongoose.connection.on('error', error => {
      console.error('TEST-DB ERROR', error);
      mongoose.connect(__MONGO_URI__, mongooseOpts);
    });
  }

  async function disconnect() {
    await mongoose.connection.close();
  }

  async function clean(collection) {
    if (!collection) await this.cleanAll();
    else await mongoose.connection.db.dropCollection(collection);
  }

  async function cleanAll() {
    await mongoose.connection.db.dropDatabase();
  }

  return {
    clean,
    connect,
    cleanAll,
    disconnect,
  };
};
