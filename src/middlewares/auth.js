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

const isUserOrAdmin = (model) => async (req, res, next) => {
  try {
    const { id } = req.params;

    if (model.modelName === 'users') {
      if (req.user._id.toString() === id || req.user.rol === 'admin') {
        console.log('Permisos concedidos: el usuario tiene acceso');
        return next();
      } else {
        return res
          .status(401)
          .json('No tienes permisos para eliminar este usuario');
      }
    }

    const resource = await model.findById(id);

    if (!resource) {
      console.log('Recurso no encontrado');
      return res.status(400).json({ message: 'Recurso no encontrado' });
    }

    console.log('Recurso encontrado:', resource);

    if (
      resource.user.toString() === req.user._id.toString() ||
      req.user.rol === 'admin'
    ) {
      console.log(
        'Permisos concedidos: el recurso pertenece al usuario o el usuario es admin'
      );
      return next();
    }

    return res.status(401).json('No tienes permisos para realizar esta acción');
  } catch (error) {
    console.log(error);
    return res.status(401).json('Error en isUserOrAdmin');
  }
};
module.exports = { isAuth, isAdmin, isUserOrAdmin };
