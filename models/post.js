const R = require('ramda');
const Checkit = require('checkit');
const bookshelf = require('../db/bookshelf');
const moment = require('moment');
const User = require('./user');

const Post = bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,
  /**
  * Модель один ко многим, один пользователь может быть автором многих постов,
  * Необходима для замены owner(id) в таблице posts на имя пользователя
  */
  user() {
    return this.belongsTo(User);
  },
  user_owner() {
    return this.belongsTo(User, 'owner', 'id');
  },
  initialize() {
    this.on('saving', this.validate, this);
  },

  /**
  * Возвращает дату создания поста
  */
  date_created() {
    return moment(this.attributes.created_at).format('DD MMMM YYYY, HH:mm');
  },
  validations: {
    title: ['required'],
    body: ['required']
  },
  validate() {
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
