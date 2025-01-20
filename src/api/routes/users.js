const { isAuth, isAdmin, isUserOrAdmin } = require('../../middlewares/auth');
const {
  register,
  login,
  deleteUser,
  getUsers,
  getUserById,
  addFavoriteSong,
  getUserFavorites
} = require('../controllers/users');
const User = require('../models/users');

const userRouter = require('express').Router();

userRouter.post('/registro', register);
userRouter.post('/login', login);
userRouter.get('/:id', [isAuth, isUserOrAdmin(User)], getUserById);
userRouter.get(
  '/:id/favoritas',
  [isAuth, isUserOrAdmin(User)],
  getUserFavorites
);
userRouter.post('/:id/favoritas', [isAuth], addFavoriteSong);
userRouter.delete('/:id', [isAuth, isUserOrAdmin(User)], deleteUser);
userRouter.get('/', [isAuth, isAdmin], getUsers);

module.exports = userRouter;
