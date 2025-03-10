const { isAuth, isUserOrAdmin } = require('../../middlewares/auth');
const {
  getSongs,
  postSong,
  putSong,
  deleteSong,
  getSongByNormalizeName
} = require('../controllers/songs');
const Song = require('../models/songs');

const songsRouter = require('express').Router();

  songsRouter.get('/cancion/:normalizedName', getSongByNormalizeName);
songsRouter.post('/', [isAuth], postSong);
songsRouter.put('/:id', [isAuth, isUserOrAdmin(Song)], putSong);
songsRouter.delete('/:id', [isAuth, isUserOrAdmin(Song)], deleteSong);
songsRouter.get('/', getSongs);

module.exports = songsRouter;
