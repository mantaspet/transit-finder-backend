module.exports = {
  createComment: function(req, res) {
    res.json('NOT IMPLEMENTED: Comment create on post ' + req.params.postId);
  },
  
  updateComment: function(req, res) {
    res.json('NOT IMPLEMENTED: Comment ' + req.params.commentId + ' update on post ' + req.params.postId);
  },

  deleteComment: function(req, res) {
    res.json('NOT IMPLEMENTED: Comment ' + req.params.commentId + ' delete on post ' + req.params.postId);
  },
};
