const mongoose = require('mongoose');

const { Schema } = mongoose;

const recepientSchema = new Schema({
  email: String,
  hasResponded: { type: Boolean, default: false },
  respondedOn: Date
});

module.exports = recepientSchema;
