/* eslint no-console: 0   */
const { PORT } = process.env;

const { SERVER_IS_RUNNING } = require('./constants/response-messages/success');

module.exports = () => {
  console.log(`\x1b[33m%s\x1b[0m`, `------------`);
  console.log('\x1b[32m%s\x1b[0m', `${SERVER_IS_RUNNING} ${PORT}.`);
  console.log(`\x1b[33m%s\x1b[0m`, `------------`);
};
