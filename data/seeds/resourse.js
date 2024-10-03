/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('person').del()
  await knex('person').insert([
    {first_name: 'Tom', last_name: 'Jons'},
    {first_name: 'Stive', last_name: 'Tomas'},
    {first_name: 'Lisa', last_name: 'Prom'},
    
  ]);
};
