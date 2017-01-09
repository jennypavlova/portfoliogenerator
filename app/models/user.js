// User Model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var schema = new Schema({
  name: {
    first: { type: String },
    last: { type: String }
  },
  username: { type: String },
  email: { type: String },
  mobileNumber: { type: String },
  password: { type: String }
});

// passportjs plugin
schema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', schema);
