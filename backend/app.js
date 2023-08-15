/* eslint-disable no-console */
// eslint-disable-next-line
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 4000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } =
  process.env;
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
// eslint-disable-next-line
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => {
    console.log('BD is working');
  })
  .catch(() => {
    console.log('BD is not working');
  });

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://maxmesto.nomoreparties.co'],
    credentials: true,
  })
);

app.use(helmet());

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log('Сервер успешно запущен');
});
