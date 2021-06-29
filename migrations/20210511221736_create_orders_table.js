exports.up = function (knex) {
  return knex.schema.createTable('pastorders', function (table) {
    table.increments('id').primary();
    table.integer('res_id').notNullable();
    table.foreign('res_id').references('resselections.id');
    table.date('date_ordered');
    table.string('person_who_ordered');
    table.double('cost');
    table.string('dishes');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('pastorders');
};
