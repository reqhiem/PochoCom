let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// For session management
let session = require('express-session');
let sessionConnection = require('express-mysql-session');
let config = require('./config/config');
require('dotenv').config()


// define the path of routes
let indexRouter = require('./routes/index');
let adminRouter = require('./routes/admin')
let visitorRouter = require('./routes/visitor')

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//For session and Cookie management
const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'admin',
  database: 'pc_session',
  expiration: 86400000,
}

const sessionStore = new sessionConnection(options);
app.use(session({
  key: 'cookie_user_pc',
  secret: 'cookie_secret_pc',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
}))

//Listen the routes
app.use('/', visitorRouter);
app.use('/admin/', adminRouter);
app.use('/visitor/', visitorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
