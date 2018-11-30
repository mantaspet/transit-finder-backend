'use strict';

var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
var User = require('mongoose').model('User');

module.exports = function () {
  passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate(accessToken, refreshToken, profile, function(err, user) {
      return done(err, user);
    });
  }));
};
