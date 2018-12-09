var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
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
  }
);

//Export model
module.exports = mongoose.model('Post', PostSchema);