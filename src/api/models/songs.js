const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    story: { type: String, required: true, trim: true },
    youtube: { type: String, required: true, trim: true }
  },
  {
    timestamps: true,
    collection: 'songs'
  }
);

const Song = mongoose.model('songs', songSchema, 'songs');

module.exports = Song;
