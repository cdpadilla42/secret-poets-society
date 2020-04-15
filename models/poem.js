const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const PoemSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  text: { type: String, required: true, max: 1000 },
  timeStamp: { type: Date, required: true, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

PoemSchema.virtual('formattedDate').get(function () {
  return moment(this.timeStamp).format('MM - DD - YY');
});

module.exports = mongoose.model('Poem', PoemSchema);
