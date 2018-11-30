var express = require('express');
var router = express.Router();

var userController = require('../controllers/user-controller');
var authController = require('../controllers/auth-controller');

router.get('/current', authController.authenticate, userController.getCurrentUser);
router.get('/', userController.getUserList);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
