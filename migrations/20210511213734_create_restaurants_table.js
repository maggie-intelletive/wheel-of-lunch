exports.up = function (knex) {
  return knex.schema.createTable('resselections', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.double('rating');
    table.string('type');
  });
};

// do everything but in reverse and opposite
exports.down = function (knex) {
  return knex.schema.dropTable('resselections');
};
