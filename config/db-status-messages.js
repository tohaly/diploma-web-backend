/* eslint no-console: 0   */
const { DATA_BASE } = require('./constants/response-messages/success');
const { DATA_BASE_ERROR } = require('./constants/response-messages/server-errors');

module.exports = (isSuccess, err = null) => {
  if (isSuccess) {
    console.log(`\x1b[32m%s\x1b[0m`, DATA_BASE);
    console.log(`\x1b[33m%s\x1b[0m`, `------------`);
  } else {
    console.log('\x1b[31m%s\x1b[0m', `${DATA_BASE_ERROR}: ${err}`);
    console.log(`\x1b[31m%s\x1b[0m`, `------------`);
  }
};
