var Post = require('mongoose').model('Post');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

module.exports = {
  postList: function (req, res) {
    Post.find({})
      .populate('user')
      .populate('comments')
      .exec(function (err, posts) {
        if (err) { return next(err); }
        res.json(posts);
      });
  },

  postDetail: function (req, res) {
    if (req.params.id > 500) {
      res.status(404).json('not found');
    } else {
      res.json('NOT IMPLEMENTED: Post ' + req.params.id + ' detail');
    }
  },

  createPost: [
    // Validate fields.
    body('from', 'Kelionės pradžios laukas privalomas').isLength({ min: 1 }).trim(),
    body('to', 'Kelionės tikslo laukas privalomas').isLength({ min: 1 }).trim(),
    body('user', 'Turi būti priskirtas egzistuojantis naudotojas').isLength({ min: 1 }).trim(),
    body('description', 'Aprašymas negali būti ilgesnis už 1000 simbolių').isLength({ min: 1001 }).trim(),
    body('date', 'Datos laukas privalomas').isLength({ min: 1 }).trim(),
    body('price', 'Kaina negali būti mažesnė už 0').isLength({ min: 1 }).trim(),

    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),
    sanitizeBody('from').trim().escape(),
    sanitizeBody('to').trim().escape(),
    sanitizeBody('user').trim().escape(),
    sanitizeBody('description').trim().escape(),
    sanitizeBody('date').toDate(),
    sanitizeBody('price').toFloat(),

    // Process request after validation and sanitization.
    
    (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a Book object with escaped and trimmed data.
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
        // Data from form is valid. Save post.
        post.save(function (err) {
          if (err) { return next(err); }
          //successful - redirect to new book record.
          res.json(post);
        });
      }
    }
  ],

  updatePost: function (req, res) {
    if (req.params.id > 500) {
      res.status(404).json('not found');
    } else {
      res.json('NOT IMPLEMENTED: Post ' + req.params.id + ' detail');
    }
  },

  deletePost: function (req, res) {
    if (req.params.id > 500) {
      res.status(404).json('not found');
    } else {
      res.json('NOT IMPLEMENTED: Post ' + req.params.id + ' detail');
    }
  },
};