let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// Gestion de sesiones
let session = require('express-session');
let sessionConnection = require('express-mysql-session');
let config = require('./config/config');
require('dotenv').config()


// Define el direccionamiento de las rutas
let adminRouter = require('./routes/admin')
let visitorRouter = require('./routes/visitor')

let app = express();

// Ver la configuracion del motor
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Para la gestion de sesiones y cookies
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

//Escucha las rutas
app.use('/', visitorRouter);
app.use('/admin/', adminRouter);

// catch 404 y reenvia el controlador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// Maneja los errores
app.use(function(err, req, res, next) {
  // Establece locals, solo proporcionando error en el desarrollo 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza la pagina de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
