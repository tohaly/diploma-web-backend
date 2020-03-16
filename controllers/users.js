const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { getResponse } = require('../libs/helpers');

const { JWT_SECRET } = process.env;

module.exports.creteUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.create({ email, password, name })
    .then(user => {
      User.updatePassword(user, res);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .then(user => getResponse(res, user))
    .catch(next);
};
