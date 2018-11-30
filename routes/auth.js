var express = require('express');
var passport = require('passport');
var router = express.Router();

var authController = require('../controllers/auth-controller');

router.post('/facebook', passport.authenticate('facebook-token', {session: false}), authController.loginUser);

module.exports = router;
