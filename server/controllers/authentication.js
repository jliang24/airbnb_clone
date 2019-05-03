const User = require('../models/User');
const jwt = require('jwt-simple');
const config = require('../config/keys');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
};

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password) {
    return res.status(422).send({
      error: 'Provide an email and password'
    });
  }
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    if (!existingUser) {
      const user = new User({
        email,
        password,
        firstName,
        lastName
      });

      user.save(function(err) {
        if (err) {
          return next(err);
        }

        res.json({ token: tokenForUser(user) });
      });
    }
  });
};
