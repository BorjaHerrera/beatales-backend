const Comment = require('../models/comments');
const Song = require('../models/songs');

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find().populate('song').populate('user');
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Comments');
  }
};

const getCommentsByUser = async (req, res, next) => {
  try {
    const { user } = req.params;
    const comments = await Comment.find({ user })
      .populate('song')
      .populate('user');
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Comments by User');
  }
};

const getCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id)
      .populate('song')
      .populate('user');
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Comments by Id');
  }
};

const getCommentByNormalizeName = async (req, res, next) => {
  try {
    const { normalizedName } = req.params;

    const song = await Song.findOne({ normalizedName });

    const comment = await Comment.find({ song: song._id }).populate('song');
    return res.status(200).json(comment);
  } catch (error) {
    return res
      .status(400)
      .json('Error en la solicitud Get Comments by NormalizeName');
  }
};

const postComment = async (req, res, next) => {
  try {
    const { text, song } = req.body;
    const { user } = req;

    const newComment = new Comment({ text, song, user: user._id });
    const comment = await newComment.save();

    const updatedSong = await Song.findByIdAndUpdate(
      song,
      { $addToSet: { comments: comment._id } },
      { new: true }
    );

    return res.status(201).json({
      message: 'Comentario creado correctamente.',
      data: {
        comment,
        song: {
          id: updatedSong._id,
          name: updatedSong.name
        }
      }
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json('Error en la solicitud Post Comment');
  }
};

const putComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newComment = new Comment(req.body);
    newComment._id = id;

    const updatedComment = await Comment.findByIdAndUpdate(id, newComment, {
      new: true
    });
    return res.status(201).json({
      message: 'Comentario modificado correctamente',
      comment: updatedComment
    });
  } catch (error) {
    return res.status(400).json('Error en la solicitud Put Comment');
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);

    const updatedSong = await Song.findOneAndUpdate(
      { comments: id },
      { $pull: { comments: id } },
      { new: true }
    );
    return res.status(200).json({
      Message: 'Comentario eliminado',
      comment: deletedComment,
      songUpdate: updatedSong
    });
  } catch (error) {
    return res.status(400).json('Error en la solicitud Delete Comment');
  }
};

module.exports = {
  getComments,
  getCommentById,
  getCommentsByUser,
  getCommentByNormalizeName,
  postComment,
  putComment,
  deleteComment
};
