const R = require('ramda');
const Checkit = require('checkit');
const bookshelf = require('../db/bookshelf');

const Post = bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,

  initialize() {
    this.on('saving', this.validate, this);
  },

  validations: {
    title: ['required'],
    body: ['required'],
  },

  validate() {
    if (this.attributes.title != null) {
      this.attributes.title = R.trim(this.attributes.title);
    }

    if (this.attributes.body != null) {
      this.attributes.body = R.trim(this.attributes.body);
    }

    return Checkit(this.validations).run(this.attributes);
  },
});

module.exports = Post;
