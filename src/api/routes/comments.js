const { isAuth, isUserOrAdmin, isAdmin } = require('../../middlewares/auth');
const {
  getComments,
  getCommentsByUser,
  postComment,
  putComment,
  deleteComment,
  getCommentById,
  getCommentByNormalizeName
} = require('../controllers/comments');
const Comment = require('../models/comments');

const commentsRouter = require('express').Router();

commentsRouter.get('/:id', [isAuth, isUserOrAdmin(Comment)], getCommentById);
commentsRouter.get(
  '/usuario/:user',
  [isAuth, isUserOrAdmin(Comment)],
  getCommentsByUser
);
commentsRouter.post('/', [isAuth], postComment);
commentsRouter.put('/:id', [isAuth, isUserOrAdmin(Comment)], putComment);
commentsRouter.delete('/:id', [isAuth, isUserOrAdmin(Comment)], deleteComment);
commentsRouter.get('/cancion/:normalizedName', getCommentByNormalizeName);

commentsRouter.get('/', [isAuth, isAdmin], getComments);

module.exports = commentsRouter;
