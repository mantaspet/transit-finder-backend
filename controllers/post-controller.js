var Post = require('mongoose').model('Post');
var Comment = require('mongoose').model('Comment');
var async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

module.exports = {
  postList: function (req, res) {
    Post.find({})
      .populate('user')
      .exec(function (err, posts) {
        if (err) { return next(err); }
        res.json(posts);
      });
  },

  postDetail: function (req, res) {
    async.parallel({
      post: function(callback) {
        Post.findById(req.params.id).populate('user').exec(callback)
      },
      comments: function(callback) {
        Comment.find({ 'post': req.params.id }).populate('user').exec(callback)
      },
    }, function(err, results) {
      if (err) { return next(err); }
      res.json(results);
    });
  },

  createPost: [
    body('from', 'Kelionės pradžios laukas privalomas').isLength({ min: 1 }).trim(),
    body('to', 'Kelionės tikslo laukas privalomas').isLength({ min: 1 }).trim(),
    body('user', 'Turi būti priskirtas egzistuojantis naudotojas').isLength({ min: 1 }),
    body('description', 'Aprašymas negali būti ilgesnis už 1000 simbolių').isLength({ max: 1001 }).trim(),
    body('date', 'Turi būti nurodyta taiskylinga data').isISO8601(),
    body('price', 'Kaina turi būti skaičius ir negali būti mažesnė už 0').optional().isInt({ min: 0 }),

    sanitizeBody('from').trim().escape(),
    sanitizeBody('to').trim().escape(),
    sanitizeBody('description').trim().escape(),
    sanitizeBody('date').toDate(),
    
    (req, res, next) => {
      const errors = validationResult(req);

      var post = new Post(
        {
          from: req.body.from,
          to: req.body.to,
          user: req.body.user,
          description: req.body.description,
          date: req.body.date,
          price: req.body.price,
        });
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
      }
      else {
        post.save(function (err) {
          if (err) { return next(err); }
          Post
            .findById(post.id)
            .populate('user')
            .exec(function (err, post) {
              if (err) { return next(err); }
              res.json(post);
            });
        });
      }
    }
  ],

  updatePost: [
    body('from', 'Kelionės pradžios laukas privalomas').isLength({ min: 1 }).trim(),
    body('to', 'Kelionės tikslo laukas privalomas').isLength({ min: 1 }).trim(),
    body('user', 'Turi būti priskirtas egzistuojantis naudotojas').isLength({ min: 1 }),
    body('description', 'Aprašymas negali būti ilgesnis už 1000 simbolių').isLength({ max: 1001 }).trim(),
    body('date', 'Turi būti nurodyta taiskylinga data').isISO8601(),
    body('price', 'Kaina turi būti skaičius ir negali būti mažesnė už 0').optional().isInt({ min: 0 }),

    sanitizeBody('from').trim().escape(),
    sanitizeBody('to').trim().escape(),
    sanitizeBody('description').trim().escape(),
    sanitizeBody('date').toDate(),
    
    (req, res, next) => {
      const errors = validationResult(req);

      var post = {
        from: req.body.from,
        to: req.body.to,
        user: req.body.user,
        description: req.body.description,
        date: req.body.date,
        price: req.body.price
      };
      delete post._id;
      if (req.auth.id != post.user) {
        res.status(403).json('Unauthorized');
        return;
      }
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
      }
      else {
        Post
          .findByIdAndUpdate(req.params.id, post, {}, function (err) {
            if (err) { return next(err); }
            Post
              .findById(req.params.id)
              .populate('user')
              .exec(function (err, updatedPost) {
                if (err) { return next(err); }
                res.json(updatedPost);
              });
          });
      }
    }
  ],

  deletePost: function (req, res) {
    async.parallel({
      post: function(callback) {
        Post.findById(req.params.id).exec(callback)
      },
      comments: function(callback) {
        Comment.find({ 'post': req.params.id }).exec(callback)
      },
    }, function(err, results) {
        if (err) { return next(err); }
        if (req.auth.id != results.post.user) {
          res.status(403).json('Unauthorized');
          return;
        }
        if (results.comments.length > 0) {
          for (var i = 0; i < results.comments.length; i++) {
            Comment.findOneAndRemove({ 'post': req.params.id }, function (err) {
              if (err) { return next(err); }
            });
          }
        }
        Post.findByIdAndRemove(req.params.id, function deletePost(err) {
          if (err) { return next(err); }
          res.status(200).json('post deleted');
        })
    });
  },
};