var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    from: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    to: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    user: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    date: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }],
  }
);

// Virtual for posts's URL
PostSchema
.virtual('url')
.get(function () {
  return '/post/' + this._id;
})

//Export model
module.exports = mongoose.model('Post', PostSchema);