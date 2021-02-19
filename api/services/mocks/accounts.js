const {mongoose} = require('node-mongoose-models');

module.exports = {
  accounts: [
    {
      _id: mongoose.Types.ObjectId(),
      username: 'test',
      email: 'test@email.com',
      password: 'aabbcc',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      username: 'testusername3',
      email: 'test3@email.com',
      password: '223344',
    },
  ],
}
