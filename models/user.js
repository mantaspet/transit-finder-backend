var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    username: {type: String, required: true, max: 100},
    profile_link: {type: String, required: true}
  }
);

// Virtual for user's URL
UserSchema
.virtual('url')
.get(function () {
  return '/catalog/user/' + this._id;
});

//Export model
module.exports = mongoose.model('User', UserSchema);