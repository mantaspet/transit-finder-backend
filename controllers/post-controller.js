module.exports = {
  postList: function(req, res) {
    res.json('NOT IMPLEMENTED: Post list');
  },

  postDetail: function(req, res) {
    if (req.params.id > 500) {
      res.status(404).json('not found');
    } else {
      res.json('NOT IMPLEMENTED: Post ' + req.params.id + ' detail');
    }
  },

  createPost: function(req, res) {
    res.json('NOT IMPLEMENTED: Post create');
  },

  updatePost: function(req, res) {
    if (req.params.id > 500) {
      res.status(404).json('not found');
    } else {
      res.json('NOT IMPLEMENTED: Post ' + req.params.id + ' detail');
    }
  },

  deletePost: function(req, res) {
    if (req.params.id > 500) {
      res.status(404).json('not found');
    } else {
      res.json('NOT IMPLEMENTED: Post ' + req.params.id + ' detail');
    }
  },
};