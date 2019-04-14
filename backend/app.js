var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// load modules
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');

// connect to db
const { mongoose } = require('./db/mongoose');

var indexRouter = require('./routes');
var tasksRouter = require('./routes/tasks');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/dist/frontend')));

// load middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use('/', indexRouter);
app.use('/tasks', tasksRouter);

module.exports = app;
