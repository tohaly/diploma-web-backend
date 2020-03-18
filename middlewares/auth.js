const jwt = require('jsonwebtoken');
const { AUTHORIZATION } = require('../config/constants/response-messages/client-errors');
const { ForbiddenError } = require('../errors');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!req.cookies.jwt) {
    throw new ForbiddenError(AUTHORIZATION);
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new ForbiddenError(AUTHORIZATION);
  }

  req.user = payload;

  next();
};
