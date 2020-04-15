const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  last_name: { type: String, required: true, max: 100 },
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true },
  member_status: {
    type: String,
    required: true,
    enum: ['admin', 'member', 'guest'],
    default: 'guest',
  },
});

UserSchema.virtual('name').get(function () {
  var fullname = '';
  if (this.first_name && this.last_name) {
    fullname = this.first_name + ' ' + this.last_name;
  } else if (!this.last_name) {
    fullname = this.first_name;
  } else {
    fullname = this.last_name;
  }

  return fullname;
});

module.exports = mongoose.model('User', UserSchema);
