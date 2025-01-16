require('dotenv').config();

const mongoose = require('mongoose');
const Song = require('../api/models/songs');
const beatlesSongs = require('./songsData');

const DB_URL = process.env.DB_URL;

const songsSeed = async () => {
  try {
    await mongoose.connect(DB_URL);

    const song = await Song.find();

    if (song.length) {
      Song.collection.drop();
      console.log('Se ha eliminado la coleccción Song');
    }

    await Song.insertMany(beatlesSongs);
    console.log('Se ha incluido la coleccción Song del array');
  } catch (error) {
    console.error('Error durante la operación:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de la base de datos.');
  }
};
songsSeed();
