var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config()

var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search')

var app = express();

//Set up mongoose connection
var connString = process.env.MONGODB_URI;
mongoose.connect(connString, {  useUnifiedTopology: true, useNewUrlParser: true , dbName: "db"});
var dataConn = mongoose.connection;
mongoose.Promise = global.Promise;
dataConn.on('error', console.error.bind(console, 'MongoDB connection error:'));
dataConn.once('open', () => console.log('Connected to Database'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/search', searchRouter);

module.exports = app; 
