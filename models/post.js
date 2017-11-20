const R = require('ramda');
const Checkit = require('checkit');
const bookshelf = require('../db/bookshelf');
const moment = require('moment');

const Post = bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,

  initialize: function() {
    this.on('saving', this.validate, this);
  },

  date_created: function() {
    return moment(this.attributes.created_at).format('DD MMMM YYYY, HH:mm');
  },
  validations: {
    title: ['required'],
    body: ['required']
  },
  validate: function() {
    if (this.attributes.title != null) {
      this.attributes.title = R.trim(this.attributes.title);
    }

    if (this.attributes.body != null) {
      this.attributes.body = R.trim(this.attributes.body);
    }

    return Checkit(this.validations).run(this.attributes);
  }

});

module.exports = Post;
