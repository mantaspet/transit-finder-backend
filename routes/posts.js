var express = require('express');
var router = express.Router();

var postController = require('../controllers/post-controller');
var authController = require('../controllers/auth-controller');

router.get('/', postController.postList);
router.get('/:id', postController.postDetail);
router.post('/', authController.authenticate, postController.createPost);
router.put('/:id', authController.authenticate, postController.updatePost);
router.delete('/:id', authController.authenticate, postController.deletePost);

module.exports = router;