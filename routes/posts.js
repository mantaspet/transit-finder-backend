var express = require('express');
var router = express.Router();

var postController = require('../controllers/post-controller');

router.get('/', postController.postList);
router.get('/:id', postController.postDetail);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;