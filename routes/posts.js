var express = require('express');
var router = express.Router();

var postController = require('../controllers/post-controller');
var commentController = require('../controllers/comment-controller');

router.get('/', postController.postList);
router.get('/:id', postController.postDetail);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

router.post('/:postId/comments', commentController.createComment);
router.put('/:postId/comments/:commentId', commentController.updateComment);
router.delete('/:postId/comments/:commentId', commentController.deleteComment);

module.exports = router;