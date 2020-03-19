const { BAD_ID, VALIDATION } = require('../config/constants/response-messages/client-errors');
const { INTERNAL_SERVER_ERROR } = require('../config/constants/response-messages/server-errors');
const { RequestWrong } = require('../errors');

module.exports = (err, res) => {
  let customError;
  switch (err.name) {
    case 'ValidationError':
      customError = new RequestWrong(`${VALIDATION} / ${err}`);
      break;
    case 'CastError':
      customError = new RequestWrong(BAD_ID);
      break;
    default:
      res.status(500).send({ message: `${INTERNAL_SERVER_ERROR}: ${err}` });
      break;
  }
  return res.status(customError.statusCode).send({ message: customError.message });
};
