const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const GooleStartegy = require('passport-google-oauth').OAuth2Strategy;
// Модуль с ключами для доступа к Google API
const gkeys = require('../google_keys.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.forge().fetch({
    id
  })
    .then(user => done(null, user))
    .catch(err => done(err));
});

/**
* Настройка аутентификации c помощью Google
*/
passport.use(new GooleStartegy(
  {
    clientID: gkeys.clientID(),
    clientSecret: gkeys.clientSecret(),
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  ((accessToken, refreshToken, profile, done) => {
    User.forge().fetch({
      prov_id: profile.id,
      provider: 'google',
      require: false
    })
      .then(user => {
        if (!user) {
          const newUser = new User({
            name: profile.displayName,
            provider: 'google',
            prov_id: profile.id,
            accessToken,
            refreshToken
          });
          return newUser.save()
            .then(usr => done(null, usr))
            .catch(err => done(err));
        }
        return done(null, user);
      })
      .catch(err => done(err));
  })
));

const router = express.Router();
/**
* Старница выбора провайдера аутентификации
*/
router.get('/', (req, res) => {
  res.render('auth', { title: 'SignIn' });
});

/**
* Профиль пользователя
* !!! В разработке
*/
router.get('/profile', (req, res) => {
  res.render('profile', { title: 'Profile' });
});

/**
* Google стратегия аутентификации
*/
router.get(
  '/google/',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

/**
* Callback для "google" авторизации
*/
router.get(
  '/google/callback',
  passport.authenticate(
    'google',
    {
      successRedirect: '/',
      failureRedirect: '/auth'
    }
  )
);

module.exports = router;
