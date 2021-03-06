var bcrypt = require("bcrypt");
var mongoose = require("mongoose");

// User Schema
var UserSchema = mongoose.Schema({
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  }
});

var User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByEmail = function(email, callback) {
  var query = { email: email };
  User.findOne(query, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    callback(null, isMatch);
  });
};

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};
