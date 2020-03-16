/* eslint-disable no-console */
require('dotenv-flow').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const auth = require('./middlewares/auth');
const users = require('./routers/users');
const areticles = require('./routers/articles');
const { notFoundRes } = require('./middlewares/not-found-res');
const { creteUser, login } = require('./controllers/users');

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

app.use('/signin', login);
app.use('/signup', creteUser);

app.use('/', auth);

app.use('/users', users);
app.use('/articles', areticles);

app.use('/', notFoundRes);

app.listen(PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', `Сервер запущен 👌, порт: ${PORT}.`);
  console.log(`\x1b[33m%s\x1b[0m`, `------------`);
});
