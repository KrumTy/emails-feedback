const mongoose = require('mongoose');
const RecepientSchema = require('./Recepient');

const { Schema } = mongoose;

const surveySchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  sentOn: Date,
  lastRespondedOn: Date,
  title: String,
  body: String,
  subject: String,
  recipients: [RecepientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 }
});

mongoose.model('surveys', surveySchema);
