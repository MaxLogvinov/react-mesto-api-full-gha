/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');

const {
  PORT = 4000,
  DB_URL = 'mongodb://127.0.0.1:27017/mestodb',
  CORS_URL = 'http://localhost:3000',
} = process.env;
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
// eslint-disable-next-line
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
const router = require('./routes/index');

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

app.use(cors({ origin: CORS_URL, credentials: true }));

app.use(helmet());

app.use(router);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log('Сервер успешно запущен');
});
