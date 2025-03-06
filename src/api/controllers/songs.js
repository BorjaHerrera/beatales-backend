const Song = require('../models/songs');
const User = require('../models/users');

const getSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().populate('comments');
    return res.status(200).json(songs);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Songs');
  }
};

const getSongByNormalizeName = async (req, res, next) => {
  try {
    const { normalizedName } = req.params;
    const song = await Song.findOne({ normalizedName }).populate('comments');
    return res.status(200).json(song);
  } catch (error) {
    return res
      .status(400)
      .json('Error en la solicitud Get Song by NormalizeName');
  }
};

const postSong = async (req, res, next) => {
  try {
    const { name, story, youtube } = req.body;

    const youtubeMusicRegex = /^(https?:\/\/)?(www\.)?music\.youtube\.com\/.+$/;

    if (!youtubeMusicRegex.test(youtube)) {
      return res.status(400).json({
        errorType: 'YOUTUBE_ERROR',
        message:
          'El enlace debe ser de YouTube Music y debe comenzar con "https://music.youtube.com"'
      });
    }
    const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Comprobar si la canción ya existe
    const existingSong = await Song.findOne({ normalizedName });

    if (existingSong) {
      console.log('Canción ya existe:', existingSong);
      return res.status(400).json({
        errorType: 'EXISTING_SONG_ERROR',
        message: 'Esta canción ya está publicada'
      });
    }

    const newSong = new Song({
      name,
      story,
      youtube,
      normalizedName,
      user: req.user.id
    });

    const savedSong = await newSong.save();

    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { uploadedSongs: savedSong._id } },
      { new: true }
    );

    return res.status(201).json({
      message: 'La canción se ha creado correctamente',
      canción: savedSong
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json('Error en la solicitud Post Song');
  }
};

const putSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name, ...rest } = req.body;

    if (name) {
      rest.normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    const newSong = new Song({ name, ...rest });
    newSong._id = id;

    const updatedSong = await Song.findByIdAndUpdate(id, newSong, {
      new: true
    });

    return res.status(201).json({
      message: 'Canción actualizada correctamente',
      cancion: updatedSong
    });
  } catch (error) {
    return res.status(400).json('Error en la solicitud Put Song');
  }
};

const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteSong = await Song.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Canción eliminada correctamente',
      cancion: deleteSong
    });
  } catch (error) {
    return res.status(404).json('Error en la solicitud Delete Song');
  }
};

module.exports = {
  getSongs,
  getSongByNormalizeName,
  postSong,
  putSong,
  deleteSong
};
