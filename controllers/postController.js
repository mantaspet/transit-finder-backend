var Post = require('../models/post');

// Display list of all Posts.
exports.post_list = function(req, res) {
  res.json('NOT IMPLEMENTED: Post list');
};

// Display detail page for a specific Post.
exports.post_detail = function(req, res) {
  if (req.params.id > 500) {
    res.status(404).json('not found');
  } else {
    res.json('NOT IMPLEMENTED: Post ' + req.params.id + ' detail');
  }
};

// Handle Post create on POST.
exports.create_post = function(req, res) {
  res.json('NOT IMPLEMENTED: Post create');
};

// Handle post update on POST.
exports.update_post = function(req, res) {
  if (req.params.id > 500) {
    res.status(404).json('not found');
  } else {
    res.json('NOT IMPLEMENTED: Post ' + req.params.id + ' detail');
  }
};

// Handle Post delete on POST.
exports.delete_post = function(req, res) {
  if (req.params.id > 500) {
    res.status(404).json('not found');
  } else {
    res.json('NOT IMPLEMENTED: Post ' + req.params.id + ' detail');
  }
};

