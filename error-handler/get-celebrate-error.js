const { VALIDATION } = require('../config/constants/response-messages/client-errors');

module.exports = (err, res) => {
  return res.status(400).send({ message: `${VALIDATION}: ${err.message}` });
};
