var express = require('express');
var router = express.Router();

var commentController = require('../controllers/comment-controller');

router.post('/', commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;