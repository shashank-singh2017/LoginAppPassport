var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/loginapp');

var db = mongoose.connection;

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  email: {
    type: String
  },
  pasword: {
    type: String
  }
});

var User = module.exports = mongoose.model('User', UserSchema);
