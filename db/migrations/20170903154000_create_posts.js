exports.up = (knex, Promise) =>
  knex.schema.createTable('posts', table => {
    table.increments();
    table.string('title').notNullable();
    table.text('body').notNullable();
    table.timestamps();
  });

exports.down = (knex, Promise) =>
  knex.schema.dropTable('posts');
