exports.up = knex =>
  knex.schema.createTable('posts', table => {
    table.increments();
    table.string('title').notNullable();
    table.text('body').notNullable();
    table.timestamps();
  });

exports.down = knex =>
  knex.schema.dropTable('posts');
