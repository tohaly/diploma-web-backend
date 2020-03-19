require('dotenv-flow').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const dbStatusMessages = require('./config/db-status-messages');
const serverStatusMessage = require('./config/server-status-message');
const auth = require('./middlewares/auth');
const router = require('./routers');
const { creteUser, login } = require('./controllers/users');
const errorHandler = require('./error-handler');
const { validateCreateUser, validateLogin } = require('./modules/celebrate-validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./modules/reate-limiter-confg');

const { PORT, MONGO_HOST } = process.env;

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect(MONGO_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    dbStatusMessages(true);
  })
  .catch(err => {
    dbStatusMessages(false, err);
  });

app.use(requestLogger);

app.use(limiter);

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, creteUser);

app.use('/', auth);

app.use(router);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  serverStatusMessage();
});
