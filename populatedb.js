#! /usr/bin/env node

console.log('This script populates some test posts, users, comments and postinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Post = require('./models/post')
var User = require('./models/user')
var Comment = require('./models/comment')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var comments = []
var posts = []

function userCreate(username, profile_link, cb) {
  userdetail = {username:username , profile_link: profile_link }
  
  var user = new User(userdetail);
       
  user.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New User: ' + user);
    users.push(user)
    cb(null, user)
  }  );
}

function commentCreate(post, user, text, date, cb) {
  commentdetail = { 
    post: post,
    user: user,
    text: text,
    date: date
  }
       
  var comment = new Comment(commentdetail);
  comment.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Comment: ' + comment);
    comments.push(comment)
    cb(null, comment);
  }   );
}

function postCreate(from, to, user, description, price, cb) {
  postdetail = { 
    from: from,
    to: to,
    user: user
  }
  if (description != false) postdetail.description = description
  if (price != false) postdetail.price = price
    
  var post = new Post(postdetail);    
  post.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Post: ' + post);
    posts.push(post)
    cb(null, post)
  }  );
}


function createUsers(cb) {
    async.parallel([
        function(callback) {
          userCreate('Patrick', 'http://google.com', callback);
        },
        function(callback) {
          userCreate('Ben', 'http://google.com', callback);
        },
        function(callback) {
          userCreate('Isaac', 'http://google.com', callback);
        },
        function(callback) {
          userCreate('Bob', 'http://google.com', callback);
        },
        function(callback) {
          userCreate('Jim', 'http://google.com', callback);
        },
        ],
        // optional callback
        cb);
}




function createPosts(cb) {
    async.parallel([
        function(callback) {
          postCreate('Kaunas', 'Vilnius', users[3], 'description', 500, callback);
        },
        function(callback) {
          postCreate('Kaunas', 'Vilnius', users[4], 'description', 500, callback);
        },
        function(callback) {
          postCreate('Kaunas', 'Druskininkai', users[4], '', 0, callback);
        },
        function(callback) {
          postCreate('Druskininkai', 'Kaunas', users[0], '', 200, callback);
        }
        ],
        // optional callback
        cb);
}


function createComments(cb) {
  async.parallel([
      function(callback) {
        commentCreate(posts[0], users[0], 'First comment', '2018-01-01', callback);
      },
      function(callback) {
        commentCreate(posts[1], users[1], 'First comment', '2018-05-01', callback);
      },
      function(callback) {
        commentCreate(posts[1], users[2], 'Second comment', '2018-04-01', callback);
      },
      ],
      // optional callback
      cb);
}


async.series([
    createUsers,
    createPosts,
    createComments
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
