var Comment = require('../models/comment');

// Handle Comment create on POST.
exports.create_comment = function(req, res) {
  res.json('NOT IMPLEMENTED: Comment create on post ' + req.params.postId);
};

// Handle comment update on POST.
exports.update_comment = function(req, res) {
  res.json('NOT IMPLEMENTED: Comment ' + req.params.commentId + ' update on post ' + req.params.postId);
};

// Handle Comment delete on POST.
exports.delete_comment = function(req, res) {
  res.json('NOT IMPLEMENTED: Comment ' + req.params.commentId + ' delete on post ' + req.params.postId);
};
