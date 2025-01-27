const bcrypt = require('bcrypt');
const { generateSign } = require('../../config/jwt');
const User = require('../models/users');
const Song = require('../models/songs');

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userDuplicated = await User.findOne({ email: req.body.email });

    if (userDuplicated) {
      return res.status(400).json({
        errorType: 'DUPLICATED_EMAIL',
        message: 'Este usuario ya existe'
      });
    }

    newUser.rol = 'user';

    const user = await newUser.save();
    return res
      .status(201)
      .json({ message: 'Usuario creado correctamente', user: user });
  } catch (error) {
    return res.status(400).json({
      errorType: 'OTHER_ERROR',
      message: 'Error durante el registro de usuario'
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        errorType: 'INVALID_PASSWORD_OR_USER',
        message: 'Usuario o contraseña incorrectos'
      });
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json({
        errorType: 'INVALID_PASSWORD_OR_USER',
        message: 'Usuario o contraseña incorrectos'
      });
    }
  } catch (error) {
    return res.status(400).json({
      errorType: 'OTHER_ERROR',
      message: 'Error en el login de usuario'
    });
  }
};
const getUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Users');
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error en la solicitud Get user by Id');
  }
};

const getUserFavorites = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('favorites');
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get User Favoritas');
  }
};

const addFavoriteSong = async (req, res, next) => {
  try {
    const { favorites } = req.body;
    const songId = favorites;
    const song = await Song.findById(songId);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { favorites: songId } },
      { new: true }
    ).populate('favorites');

    return res.status(201).json({
      message: `La canción se ha incluido en tu lista de favoritos.`,
      user: user,
      song: song
    });
  } catch (error) {
    return res.status(400).json('Error al agregar la canción a favoritos.');
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDeleted = await User.findByIdAndDelete(id);

    return res.status(200).json({ mensaje: 'Usuario eliminado:', userDeleted });
  } catch (error) {
    return res.status(400).json('Error en la solicitud Delete User');
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getUserById,
  addFavoriteSong,
  getUserFavorites,
  deleteUser
};
