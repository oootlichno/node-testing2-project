/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('person', tbl => {
        tbl.increments();
        tbl.text('first_name', 128)
        .notNullable();
        tbl.text('last_name', 128)
        .notNullable();
       });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('person');
};
