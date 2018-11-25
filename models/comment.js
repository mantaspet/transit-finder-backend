var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, // reference to the associated post
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // reference to the associated user
    text: { type: String, required: true},
    date: { type: Date, required: true },
  }
);

// Virtual for comment's URL
CommentSchema
.virtual('url')
.get(function () {
  return '/catalog/comment/' + this._id;
});

//Export model
module.exports = mongoose.model('Comment', CommentSchema);