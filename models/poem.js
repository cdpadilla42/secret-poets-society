const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PoemSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  text: { type: String, required: true, max: 1000 },
  timeStamp: { type: Date, required: true, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Poem', PoemSchema);
