const commentsRouter = require('./comments');
const songsRouter = require('./songs');
const userRouter = require('./users');
const mainRouter = require('express').Router();

mainRouter.use('/', songsRouter);
mainRouter.use('/usuarios', userRouter);
mainRouter.use('/comentarios', commentsRouter);

module.exports = mainRouter;
