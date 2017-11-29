const express = require('express');
const Post = require('../models/post');
const Checkit = require('checkit');

const router = express.Router();

/* GET posts listing */
router.get('/', (req, res, next) => {
  Post.fetchAll().then(posts => {
    res.render('posts/index', { title: 'All posts', posts: posts.models });
  }).catch(next);
});

/* GET new post */
router.get('/new', (req, res) => {
  const post = new Post({});

  res.render('posts/new', { title: 'New post', post });
});

/* POST create post */
router.post('/create', (req, res, next) => {
  const post = new Post({
    title: req.body.post_title,
    body: req.body.post_body,
  });

  post.save().then(() => {
    res.redirect('/posts');
  }).catch(Checkit.Error, e => {
    res.render('posts/new', { title: 'New post', post, error: e });
  }).catch(next);
});

module.exports = router;
