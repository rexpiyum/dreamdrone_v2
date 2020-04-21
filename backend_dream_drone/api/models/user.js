var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },

  isOwning: {
    index: Number,
    value: String
  },

  ageRange: {
    index: Number,
    value: String
  },

  gender: {
    index: Number,
    value: String
  },

  country: {
    index: Number,
    value: String
  },

  background: {
    value: String
  },

  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
