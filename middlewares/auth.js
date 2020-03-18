const jwt = require('jsonwebtoken');
const { AUTHORIZATION } = require('../config/constants/response-messages/client-errors');
const { ForbiddenError } = require('../errors');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ForbiddenError(AUTHORIZATION);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new ForbiddenError(AUTHORIZATION);
  }

  req.user = payload;

  next();
};
