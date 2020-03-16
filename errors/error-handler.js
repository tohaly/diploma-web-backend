/* eslint no-unused-vars: 0   */
const { isCelebrate } = require('celebrate');

const translateErrors = require('./translate-errors');
const responseMessages = require('../libs/response-messages');

module.exports = (err, _req, res, next) => {
  if (isCelebrate(err)) {
    return res
      .status(400)
      .send({ message: `${responseMessages.clientErrors.validation}: ${err.message}` });
  }
  if (!err.statusCode) {
    return translateErrors(err, res);
  }

  return res.status(err.statusCode).send({ message: err.message });
};
