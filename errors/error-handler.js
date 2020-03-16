/* eslint no-unused-vars: 0   */
const translateErrors = require('./translate-errors');

module.exports = (err, _req, res, next) => {
  if (!err.statusCode) {
    return translateErrors(err, res);
  }

  return res.status(err.statusCode).send({ message: err.message });
};
