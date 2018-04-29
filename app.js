const environment = (`${process.env.NODE_ENV}` || 'development').trim();
const express = require('express');
// express-session должен стоять перед passport иначе будут проблемы с post запросами
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);
const path = require('path');
const passport = require('passport');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');

const index = require('./routes/index');
const posts = require('./routes/posts');
const auth = require('./routes/auth');

const moment = require('moment');

const app = express();

// set date and time locale
moment.locale('ru');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

/**
* Настройка хранилища для express-session
*/
const store = new KnexSessionStore({ knex, tablename: 'sessions' });

// Настройки express сессии для пользователя
app.use(session({
  secret: 'testtesttest',
  resave: true,
  saveUninitialized: true,
  cookie: {
    // Тестовое значение, 60 сек
    maxAge: 60000
  },
  store
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/posts', posts);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error(`${req.url} Not Found`);
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.locals.inputClass = (name, err) =>
  ((err == null || err.get(name) == null)
    ? 'form-control'
    : 'form-control is-invalid');
module.exports = app;
