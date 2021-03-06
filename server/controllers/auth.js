const { validationResult } = require('express-validator/check');
const passport = require('passport');
const User = require('../models/User');

function validateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      success: false,
      message: 'Validation failed, entered data is incorrect',
      errors: errors.array()
    });
    return false;
  }
  return true;
}

module.exports = {
  register: (req, res, next) => {
    if (validateUser(req, res)) {
      passport.authenticate('local-signup', (err, user) => {
        if (err) {
          return next(err);
        } else {
          res
            .json({
              success: true,
              message: `You have successfully signed up! Now you should be able to log in, ${user.firstName}.`
            });
        }
      })(req, res, next)
    }
  },
  login: (req, res, next) => {
    if (validateUser(req, res)) {
      passport.authenticate('local-login', (err, token, userData) => {
        if (err) {
          return next(err);
        } else {
          res
            .json({
              success: true,
              message: `You have successfully logged in, ${userData.firstName}!`,
              jwt: token,
              user: userData,
            });
        }
      })(req, res, next)
    }
  },
  getProfile: (req, res, next) => {
    const userId = req.userId;

    User
      .findById(userId)
      .populate({
        path: 'posts',
        match: { status: 'Approved' },
        populate: {
          path: 'creator',
          select: 'username _id'
        }
      })
      .then(user => {
        if (user.posts.length) {
          res
            .status(200)
            .json({
              success: true,
              message: `Here are your posts, ${user.username}!`,
              posts: user.posts
            });
        } else {
          res
            .status(200)
            .json({
              success: true,
              message: `Currently you have no posts, ${user.username}!`,
              posts: user.posts
            });
        }
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      })
  }
}