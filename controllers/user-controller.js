var User = require('mongoose').model('User');

module.exports = {
  getCurrentUser: function (req, res, next) {
    User.findById(req.auth.id, function (err, user) {
      if (err) {
        next(err);
      } else {
        var user = user.toObject();
        delete user['__v'];
        res.json(user);
      }
    });
  },

  getUserList: function (req, res) {
    res.json('NOT IMPLEMENTED: User list');
  },

  createUser: function (req, res) {
    res.json('NOT IMPLEMENTED: User create');
  },

  updateUser: function (req, res) {
    res.json('NOT IMPLEMENTED: User ' + req.params.id + ' update');
  },

  deleteUser: function (req, res) {
    res.json('NOT IMPLEMENTED: User ' + req.params.id + ' delete');
  }
};
