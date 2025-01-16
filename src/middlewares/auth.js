const User = require('../api/models/users');
const { verifyJwt } = require('../config/jwt');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json('No estás autorizado');
    }
    const parsedToken = token.replace('Bearer ', '');
    if (!parsedToken) {
      return res.status(400).json('No estás autorizado: Token mal formado');
    }

    console.log(parsedToken);

    const { id } = verifyJwt(parsedToken);

    if (!id) {
      return res.status(400).json('No estás autorizado: Token inválido');
    }

    const user = await User.findById(id);

    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error en el isAuth');
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.rol === 'admin') {
      user.password = null;
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(401).json('No tienes permisos de administrador');
  }
};

const isUserOrAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user._id === req.user._id || req.user._id === 'admin') {
      return next();
    } else {
      return res.status(401).json('No tienes permisos de administrador');
    }
  } catch (error) {
    return res.status(401).json('Error en isUserOrAdmin');
  }
};

module.exports = { isAuth, isAdmin, isUserOrAdmin };
