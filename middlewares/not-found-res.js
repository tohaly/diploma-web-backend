const responseMessages = require('../libs/response-messages');
const { NotFoundError } = require('../errors');

module.exports.notFoundRes = () => {
  throw new NotFoundError(responseMessages.clientErrors.resourceNotFound);
};
