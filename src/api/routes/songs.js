const { isAuth, isAdmin } = require('../../middlewares/auth');
const {
  getSongByName,
  getSongs,
  postSong,
  putSong,
  deleteSong
} = require('../controllers/songs');

const songsRouter = require('express').Router();

songsRouter.get('/cancion/:name', getSongByName);
songsRouter.post('/', [isAuth, isAdmin], postSong);
songsRouter.put('/:id', [isAuth, isAdmin], putSong);
songsRouter.delete('/:id', [isAuth, isAdmin], deleteSong);
songsRouter.get('/', getSongs);

module.exports = songsRouter;
