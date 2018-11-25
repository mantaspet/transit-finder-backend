var User = require('../models/user');

// Display list of all Users.
exports.user_list = function(req, res) {
  res.json('NOT IMPLEMENTED: User list');
};

// Handle User create on POST.
exports.create_user = function(req, res) {
  res.json('NOT IMPLEMENTED: User create');
};

// Handle User update on POST.
exports.update_user = function(req, res) {
  res.json('NOT IMPLEMENTED: User ' + req.params.id + ' update');
};

// Handle User delete on POST.
exports.delete_user = function(req, res) {
  res.json('NOT IMPLEMENTED: User ' + req.params.id + ' delete');
};
