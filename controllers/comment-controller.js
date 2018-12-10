var Comment = require('mongoose').model('Comment');
var User = require('mongoose').model('User');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

module.exports = {
  createComment: [
    body('post', 'Turi būti priskirtas egzistuojantis skelbimas').isLength({ min: 1 }).trim(),
    body('user', 'Turi būti priskirtas egzistuojantis naudotojas').isLength({ min: 1 }).trim(),
    body('text', 'Teksto laukas privalomas').isLength({ min: 1 }).trim(),
    body('text', 'Tekstas negali būti ilgesnis už 1000 simbolių').isLength({ max: 1001 }).trim(),
    body('date', 'Turi būti nurodyta taiskylinga data').isISO8601(),

    sanitizeBody('post').trim().escape(),
    sanitizeBody('user').trim().escape(),
    sanitizeBody('text').trim().escape(),
    sanitizeBody('date').toDate(),

    (req, res, next) => {
      const errors = validationResult(req);

      var comment = new Comment({
        post: req.body.post,
        user: req.body.user,
        text: req.body.text,
        date: req.body.date,
      });
      if (!errors.isEmpty()) {
        res.status(422).json({
          errors: errors.array(),
        });
      } else {
        comment.save(function (err, comment) {
          if (err) { return next(err); }
          User.findById(comment.user).exec(function (err, user) {
            if (err) { return next(err); }
            comment.user = user;
            res.json(comment);
          });
        });
      }
    }
  ],

  updateComment: [
    body('post', 'Turi būti priskirtas egzistuojantis skelbimas').isLength({ min: 1 }).trim(),
    body('user', 'Turi būti priskirtas egzistuojantis naudotojas').isLength({ min: 1 }).trim(),
    body('text', 'Teksto laukas privalomas').isLength({ min: 1 }).trim(),
    body('text', 'Tekstas negali būti ilgesnis už 1000 simbolių').isLength({ max: 1001 }).trim(),
    body('date', 'Turi būti nurodyta taiskylinga data').isISO8601(),

    sanitizeBody('post').trim().escape(),
    sanitizeBody('user').trim().escape(),
    sanitizeBody('text').trim().escape(),
    sanitizeBody('date').toDate(),

    (req, res, next) => {
      const errors = validationResult(req);

      var comment = {
        post: req.body.post,
        user: req.body.user,
        text: req.body.text,
        date: req.body.date,
      };
      if (req.auth.id != comment.user) {
        res.status(403).json('Unauthorized');
        return;
      }
      if (!errors.isEmpty()) {
        res.status(422).json({
          errors: errors.array(),
        });
      } else {
        Comment.findByIdAndUpdate(req.params.id, comment, {}, function (err) {
          if (err) { return next(err); }
          Comment.findById(req.params.id).populate('user').exec(function (err, updatedComment) {
            if (err) { return next(err); }
            res.json(updatedComment);
          });
        });
      }
    }
  ],

  deleteComment: function (req, res, next) {
    Comment.findByIdAndDelete(req.params.id, function (err, comment) {
      if (err) { return next(err); }
      if (req.auth.id != comment.user) {
        res.status(403).json('Unauthorized');
        return;
      }
      res.json('comment deleted');
    });
  },
};
