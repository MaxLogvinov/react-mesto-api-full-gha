const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, createUser, logOut } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const regex = require('../utils/regex');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regex),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);
router.post('/logout', logOut);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
// eslint-disable-next-line
router.use('*', (req, res) => {
  throw new NotFoundError('Данной страницы не существует');
});

module.exports = router;
