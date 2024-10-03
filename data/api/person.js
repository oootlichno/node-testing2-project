const db = require('../db-config')

module.exports = {
    getAll,
    getById,
    insert,
    remove,
    update
}

function getAll() {
    return db('person');
  }
  
  function getById(id) {
    return db('person').where({ id }).first();
  }

  async function insert(person) {
    const [id] = await db('person').insert(person);
    return db('person').where({ id }).first();
  }
  
  async function update(id, changes) {
    await db('person').where({ id }).update(changes);
    return db('person').where({ id }).first();
  }
  
  function remove(id) {
    return db('person').where({ id }).delete();
  }
