const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    normalizedName: { type: String, required: true, trim: true, unique: true },
    story: { type: String, required: true, trim: true },
    youtube: { type: String, required: true, trim: true },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
    comments: [
      { type: mongoose.Types.ObjectId, require: false, ref: 'comments' }
    ]
  },
  {
    timestamps: true,
    collection: 'songs'
  }
);

songSchema.pre('save', function (next) {
  if (!this.name) {
    console.error('Error: name is not defined');
    return next(new Error('Name is required'));
  }

  this.normalizedName = this.name.toLowerCase().replace(/[^a-z0-9]/g, '');

  console.log('Normalized Name:', this.normalizedName);

  next();
});
const Song = mongoose.model('songs', songSchema, 'songs');

module.exports = Song;
