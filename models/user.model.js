const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  passport_serias: {
    type: String,
    required: true,
  },
  passport_number: {
    type: String,
    required: true,
  },
});
UserSchema.index({ passport_serias: 1, passport_number: 1 }, { unique: true });
module.exports = mongoose.model('User', UserSchema);
