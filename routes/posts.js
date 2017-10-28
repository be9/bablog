const express = require('express');
const Post = require('../models/post');

const router = express.Router();

/* GET posts listing */
router.get('/', (req, res, next) => {
  Post.fetchAll().then(posts => {
    res.render('posts/index', { title: 'All posts', posts: posts.models });
  })
    .catch(next);
});

/* GET new post */
router.get('/new', (req, res) => {
  res.render('posts/new', { title: 'New post' });
});

module.exports = router;
