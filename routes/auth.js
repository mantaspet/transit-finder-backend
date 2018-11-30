var express = require('express');
var router = express.Router();
var passport = require('passport');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var createToken = function(auth) {
  return jwt.sign({
    id: auth.id
  }, process.env.APP_SECRET,
  {
    expiresIn: 60 * 120
  });
};

var generateToken = function (req, res, next) {
  req.token = createToken(req.auth);
  next();
};

var sendToken = function (req, res) {
  res.setHeader('x-auth-token', req.token);
  res.status(200).send(req.auth);
};

var getCurrentUser = function(req, res, next) {
  User.findById(req.auth.id, function(err, user) {
    if (err) {
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
};

var getOne = function (req, res) {
  var user = req.user.toObject();

  delete user['facebookProvider'];
  delete user['__v'];

  res.json(user);
};

var authenticate = expressJwt({
  secret: process.env.APP_SECRET,
  requestProperty: 'auth',
  getToken: function(req) {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
});



router.route('/facebook').post(passport.authenticate('facebook-token', {session: false}), function(req, res, next) {
	if (!req.user) {
		return res.send(401, 'User Not Authenticated');
	}

	// prepare token for API
	req.auth = {
		id: req.user.id
	};

	next();
}, generateToken, sendToken);

router.route('/auth/me').get(authenticate, getCurrentUser, getOne);

module.exports = router;
