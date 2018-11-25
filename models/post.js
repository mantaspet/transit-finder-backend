var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    from: {type: String, required: true},
    to: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    description: {type: String},
    price: {type: Number},
  }
);

// Virtual for post's URL
PostSchema
.virtual('url')
.get(function () {
  return '/catalog/post/' + this._id;
});

//Export model
module.exports = mongoose.model('Post', PostSchema);