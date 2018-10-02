const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/keys');

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true
  }
);
