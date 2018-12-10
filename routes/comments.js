var express = require('express');
var router = express.Router();

var commentController = require('../controllers/comment-controller');
var authController = require('../controllers/auth-controller');

router.post('/', authController.authenticate, commentController.createComment);
router.put('/:id', authController.authenticate, commentController.updateComment);
router.delete('/:id', authController.authenticate, commentController.deleteComment);

module.exports = router;