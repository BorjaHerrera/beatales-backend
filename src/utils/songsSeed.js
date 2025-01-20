require('dotenv').config();

const mongoose = require('mongoose');
const Song = require('../api/models/songs');
const beatlesSongs = require('./songsData');

const DB_URL = process.env.DB_URL;

const songsSeed = async () => {
  try {
    await mongoose.connect(DB_URL);

    // Verifica si ya existen canciones y elimina la colección si es necesario
    const song = await Song.find();

    if (song.length) {
      await Song.collection.drop();
      console.log('Se ha eliminado la coleccción Song');
    }

    // Normaliza los nombres de las canciones
    const songsWithNormalizedName = beatlesSongs.map((song) => ({
      ...song,
      normalizedName: song.name.toLowerCase().replace(/[^a-z0-9]/g, '') // Normalizamos el nombre
    }));

    // Inserta las canciones con el campo 'normalizedName' ya añadido
    await Song.insertMany(songsWithNormalizedName);
    console.log('Se ha incluido la coleccción Song del array');
  } catch (error) {
    console.error('Error durante la operación:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de la base de datos.');
  }
};

songsSeed();
