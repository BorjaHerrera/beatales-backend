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

    const token = generateSign(user._id);

    return res.status(201).json({
      message: 'Usuario creado correctamente',
      user: user,
      token: token
    });
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

const getUserUploaded = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('uploadedSongs');
    return res.status(200).json(user.uploadedSongs);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error en la solicitud Get User Uploaded', error });
  }
};

const addFavoriteSong = async (req, res, next) => {
  try {
    let { favorites } = req.body;

    if (!favorites) {
      return res.status(400).json({ message: 'Falta el ID de la canción' });
    }

    if (!Array.isArray(favorites)) {
      favorites = [favorites];
    }

    const songs = await Song.find({ _id: { $in: favorites } });
    if (songs.length !== favorites.length) {
      return res
        .status(404)
        .json({ message: 'Una o más canciones no fueron encontradas' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { favorites: { $each: favorites } } },
      { new: true }
    ).populate('favorites');

    return res.status(201).json({
      message: `Las canciones se han añadido a tus favoritos.`,
      user,
      favorites: user.favorites
    });
  } catch (error) {
    console.error('Error al agregar las canciones a favoritos:', error);
    return res.status(400).json({ message: 'Error interno del servidor' });
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

const deleteFavoriteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const { songId } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { favorites: songId } },
      { new: true }
    ).populate('favorites');

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const deletedSong = await Song.findById(songId);

    if (!deletedSong) {
      return res.status(400).json({ message: 'La canción no existe' });
    }

    return res.status(200).json({
      message: 'Canción eliminada de favoritos',
      deletedSong
    });
  } catch (error) {
    console.error('Error al eliminar la canción de favoritos:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getUserById,
  getUserUploaded,
  addFavoriteSong,
  getUserFavorites,
  deleteUser,
  deleteFavoriteSong
};
