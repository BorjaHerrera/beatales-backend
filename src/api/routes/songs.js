const { isAuth, isUserOrAdmin } = require('../../middlewares/auth');
const {
  getSongByName,
  getSongs,
  postSong,
  putSong,
  deleteSong,
  getSongsbyUser
} = require('../controllers/songs');
const Song = require('../models/songs');

const songsRouter = require('express').Router();

songsRouter.get(
  '/usuario/:user',
  [isAuth, isUserOrAdmin(Song)],
  getSongsbyUser
);
songsRouter.get('/cancion/:name', getSongByName);
songsRouter.post('/', [isAuth], postSong);
songsRouter.put('/:id', [isAuth, isUserOrAdmin(Song)], putSong);
songsRouter.delete('/:id', [isAuth, isUserOrAdmin(Song)], deleteSong);
songsRouter.get('/', getSongs);

module.exports = songsRouter;
