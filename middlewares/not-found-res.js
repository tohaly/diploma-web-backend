const { RESOURCE_NOT_FOUND } = require('../config/constants/response-messages/client-errors');
const { NotFoundError } = require('../errors');

module.exports.notFoundRes = () => {
  throw new NotFoundError(RESOURCE_NOT_FOUND);
};
