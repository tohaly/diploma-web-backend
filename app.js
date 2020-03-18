/* eslint no-console: 0   */
require('dotenv-flow').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const auth = require('./middlewares/auth');
const router = require('./routers');
const { creteUser, login } = require('./controllers/users');
const errorHandler = require('./error-handler');
const { validateCreateUser, validateLogin } = require('./modules/celebrate-validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGO_HOST } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(MONGO_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`\x1b[32m%s\x1b[0m`, `База данных успешно подключена`);
    console.log(`\x1b[33m%s\x1b[0m`, `------------`);
  })
  .catch(err => {
    console.log('\x1b[31m%s\x1b[0m', `Ошибка баззы данных: ${err}`);
    console.log(`\x1b[31m%s\x1b[0m`, `------------`);
  });

app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, creteUser);

app.use('/', auth);

app.use(router);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\x1b[33m%s\x1b[0m`, `------------`);
  console.log('\x1b[32m%s\x1b[0m', `Сервер запущен 👌, порт: ${PORT}.`);
  console.log(`\x1b[33m%s\x1b[0m`, `------------`);
});
