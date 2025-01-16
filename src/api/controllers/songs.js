const Song = require('../models/songs');

const getSongs = async (req, res, next) => {
  try {
    const songs = await Song.find();
    return res.status(200).json(songs);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Songs');
  }
};

const getSongByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const song = await Song.findOne({ name: name });
    return res.status(200).json(song);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Song by Name');
  }
};

const postSong = async (req, res, next) => {
  try {
    const { name } = req.body;

    const existingSong = await Song.findOne({ name });

    if (existingSong) {
      return res.status(400).json('Esta canción ya existe');
    }

    const newSong = new Song(req.body);
    const savedSong = await newSong.save();

    return res.status(201).json({
      message: 'La canción se ha creado correctamente',
      canción: savedSong
    });
  } catch (error) {
    return res.status(400).json('Error en la solicitud Post Song');
  }
};

const putSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newSong = new Song(req.body);
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

module.exports = { getSongs, getSongByName, postSong, putSong, deleteSong };
