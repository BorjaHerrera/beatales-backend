const { isAuth, isAdmin, isUserOrAdmin } = require('../../middlewares/auth');
const {
  register,
  login,
  deleteUser,
  getUsers,
  getUserById,
  addFavoriteSong,
  getUserFavorites,
  deleteFavoriteSong
} = require('../controllers/users');
const User = require('../models/users');

const userRouter = require('express').Router();

userRouter.post('/registro', register);
userRouter.post('/login', login);
userRouter.get('/:id', [isAuth, isUserOrAdmin(User)], getUserById);
// prettier-ignore
userRouter.get('/:id/favoritas',[isAuth, isUserOrAdmin(User)],getUserFavorites);
userRouter.post('/:id/favoritas', [isAuth], addFavoriteSong);
userRouter.delete('/:id', [isAuth, isUserOrAdmin(User)], deleteUser);
// prettier-ignore
userRouter.delete('/:id/favoritas/:songId',[isAuth, isUserOrAdmin(User)], deleteFavoriteSong);
userRouter.get('/', [isAuth, isAdmin], getUsers);

module.exports = userRouter;
