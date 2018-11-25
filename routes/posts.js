var express = require('express');
var router = express.Router();

var post_controller = require('../controllers/postController');
var comment_controller = require('../controllers/commentController');

router.get('/', post_controller.post_list);
router.get('/:id', post_controller.post_detail);
router.post('/', post_controller.create_post);
router.put('/:id', post_controller.update_post);
router.delete('/:id', post_controller.delete_post);

router.post('/:postId/comments', comment_controller.create_comment);
router.put('/:postId/comments/:commentId', comment_controller.update_comment);
router.delete('/:postId/comments/:commentId', comment_controller.delete_comment);

module.exports = router;