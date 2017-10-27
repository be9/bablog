const environment = process.env.NODE_ENV || 'development';

const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);

module.exports = require('bookshelf')(knex);
