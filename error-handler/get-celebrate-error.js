const responseMessages = require('../libs/response-messages');

module.exports = (err, res) => {
  return res
    .status(400)
    .send({ message: `${responseMessages.clientErrors.validation}: ${err.message}` });
};
