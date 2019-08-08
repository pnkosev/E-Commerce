const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const encryption = require('../utilities/encryption');

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const user = {
    email: email,
    password : req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    code: req.body.code,
    phoneNumber: req.body.phoneNumber
  }
  User
    .findOne({ email: email })
    .then(u => {
      if (u) {
        return done('Email already exists!');
      }

      const salt = encryption.generateSalt();
      user.salt = salt;
      user.hashedPassword = encryption.generateHashedPassword(salt, user.password);
      user.roles = ['User'];
      user.phoneNumber = user.phoneNumber.startsWith('0') ? user.code + user.phoneNumber.substring(1) : user.code + user.phoneNumber;

      User
        .create(user)
        .then(() => {
          return done(null, user);
        })
        .catch(() => {
          return done('Something went wrong :( Check the form for errors.');
        })
    })
    .catch(err => {
      return done(err);
    })
})
