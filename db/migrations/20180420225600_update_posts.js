exports.up = knex =>
  knex.schema.table('posts', table => {
    table.integer('owner');
  });

exports.down = knex =>
  knex.schema.dropTable('posts');
