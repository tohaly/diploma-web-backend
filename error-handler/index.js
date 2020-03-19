/* eslint no-unused-vars: 0   */
const { isCelebrate } = require('celebrate');

const getCelebrateErr = require('./get-celebrate-error');
const translateErrors = require('./translate-errors');

module.exports = (err, _req, res, next) => {
  if (isCelebrate(err)) {
    return getCelebrateErr(err, res);
  }
  if (!err.statusCode) {
    return translateErrors(err, res);
  }

  return res.status(err.statusCode).send({ message: err.message });
};
