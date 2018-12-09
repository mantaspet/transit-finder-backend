var User = require('mongoose').model('User');

module.exports = {
  getCurrentUser: function (req, res, next) {
    User.findById(req.auth.id, function (err, user) {
      if (err) {
        next(err);
      } else {
        var user = user.toObject();
        delete user['__v'];
        //user.
        res.json(user);
      }
    });
  },

  getUserList: function (req, res) {
    User.find({})
      .exec(function (err, users) {
        if (err) { return next(err); }
        res.json(users);
      });
  },

  suspendUser: function (req, res) {
    User
      .findByIdAndUpdate(req.params.id, {
        isActive: false
      }, {}, function (err, user) {
        if (err) { return next(err); }
        User
          .findById(req.params.id).exec(function(err, user) {
            if (err) { return next(err); }
            res.json(user);
          });
      });
  }
};
