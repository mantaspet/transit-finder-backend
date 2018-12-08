var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    date: {
      type: Date,
      required: true,
    },
  }
);

// Virtual for comment's URL
CommentSchema
.virtual('url')
.get(function () {
  return '/comment/' + this._id;
});

//Export model
module.exports = mongoose.model('Comment', CommentSchema);