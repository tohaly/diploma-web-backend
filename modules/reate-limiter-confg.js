const rateLimit = require('express-rate-limit');
const { RATE_LIMIT } = require('../config/constants/response-messages/client-errors');

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: RATE_LIMIT }
});
