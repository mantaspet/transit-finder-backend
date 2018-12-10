var express = require('express');
var router = express.Router();

var userController = require('../controllers/user-controller');
var authController = require('../controllers/auth-controller');

router.get('/current', authController.authenticate, userController.getCurrentUser);
router.get('/', authController.authenticate, userController.getUserList);
router.put('/:id/suspend', authController.authenticate, userController.suspendUser);

module.exports = router;
