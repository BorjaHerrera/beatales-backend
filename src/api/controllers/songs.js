const Song = require('../models/songs');

const getSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().populate('comments');
    return res.status(200).json(songs);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Songs');
  }
};

const getSongsbyUser = async (req, res, next) => {
  try {
    const { user } = req.params;
    const songs = await Song.find({ user }).populate('user');

    if (songs.length === 0) {
      return res.status(404).json({
        message: `No se encontraron canciones para el usuario: ${user}`
      });
    }

    return res.status(200).json(songs);
  } catch (error) {
    return res.status(400).json({
      message: 'Error al obtener Songs by User.',
      error: error
    });
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

    const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Comprobar si la canción ya existe
    const existingSong = await Song.findOne({ normalizedName });

    if (existingSong) {
      return res.status(400).json('Esta canción ya existe');
    }

    const newSong = new Song({
      name,
      story,
      youtube,
      normalizedName,
      user: req.user.id
    });

    const savedSong = await newSong.save();

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
  getSongsbyUser,
  getSongByNormalizeName,
  postSong,
  putSong,
  deleteSong
};
