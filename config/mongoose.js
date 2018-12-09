var mongoose = require('mongoose');
var mongoDB = process.env.CONNECT_DB;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
require('../models/user');
require('../models/post');
require('../models/comment');
