/**
* Модель доступа к данным пользователя
*/
const Joi = require('joi');
const bookshelf = require('../db/bookshelf');
const Posts = require('./post');

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  /**
  * Модель отношений необходима для замены owner(id) в таблице posts на имя пользователя
  */
  posts() {
    return this.hasMany(Posts);
  },
  posts_parent() {
    return this.hasMany(Posts, 'id', 'owner');
  },
  validate: {
    name: Joi.string(),
    prov_id: Joi.string(),
    provider: Joi.string(),
    accessToken: Joi.string(),
    refreshToken: Joi.string()
  }
});

module.exports = User;
