const express = require('express');
const Post = require('../models/post');
const Checkit = require('checkit');

const router = express.Router();

/**
* Загружает все посты и данные их авторов
*/
router.get('/', (req, res, next) => {
  Post.fetchAll({ withRelated: ['user_owner'] })
    .then(posts => {
      res.render('posts/index', { title: 'All posts', posts: posts.models });
    }).catch(next);
});

/**
* Функция проверки пользователя, пославшего запрос
*/
function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/auth');
  }
}

/**
* Форма создания нового поста
*/
router.get('/new', isAuth, (req, res) => {
  const post = new Post({});
  res.render('posts/new', { title: 'New post', post });
});

/**
* Отправляет данные с формы создания поста в базу.
* !!! Здесь возможна ситуация что сессия истекет пока пользователь писал пост,
* следовательно, нужно сохранить данные формы, отправить пользователя на авторизацию,
* и затем уже записать данные в базу (при успешной аутентификации). Для этого
* нужно освоить работу с accessToken
*/
router.post('/create', isAuth, (req, res, next) => {
  const post = new Post({
    title: req.body.post_title,
    body: req.body.post_body,
    owner: req.session.passport.user
  });

  post.save().then(() => {
    res.redirect('/posts');
  }).catch(Checkit.Error, e => {
    res.render('posts/new', { title: 'New post', post, error: e });
  }).catch(next);
});

module.exports = router;
