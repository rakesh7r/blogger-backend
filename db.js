const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Connection error:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected');
});

module.exports = { db };
