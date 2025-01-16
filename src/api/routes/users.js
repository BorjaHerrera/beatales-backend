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

const userRouter = require('express').Router();

userRouter.post('/registro', register);
userRouter.post('/login', login);
userRouter.get('/:id', [isAuth], getUserById);
userRouter.get('/:id/favoritas', [isAuth], getUserFavorites);
userRouter.post('/:id/favoritas', [isAuth], addFavoriteSong);
userRouter.delete('/:id', [isAuth, isAdmin], deleteUser);
userRouter.get('/', [isAuth, isUserOrAdmin], getUsers);

module.exports = userRouter;
