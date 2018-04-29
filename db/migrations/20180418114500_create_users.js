exports.up = knex =>
  knex.schema.createTable('users', table => {
    table.increments();
    table.string('provider').notNullable();
    table.string('prov_id').notNullable();
    table.string('name').notNullable();
    table.string('accessToken');
    table.string('refreshToken');
    table.timestamps();
  });

exports.down = knex =>
  knex.schema.dropTable('users');
