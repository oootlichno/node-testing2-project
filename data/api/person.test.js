const db = require('../db-config');
const server = require('../../server');

const request = require('supertest');
const Person = require('./person');

beforeAll(async () => {
    await db.migrate.rollback(); 
    await db.migrate.latest();
  })
  beforeEach(async () => {
    await db('person').truncate();
  })
  afterAll(async () => {
    await db.destroy();
  })

  it('correct env var', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })

  describe('getAll()', () => {
    it('gets empty list when no persons in db',async () => {
        let person = await Person.getAll();
        expect(person).toHaveLength(0);
    })
    it('can get a list with all persons in db', async () => {
        await db('person').insert({ first_name: 'Jack', last_name:'Kan' });
        let persons = await Person.getAll();
        expect(persons).toHaveLength(1);
        await db('person').insert({ first_name: 'Sam', last_name:'Tomopol' });
        persons = await Person.getAll();
        expect(persons).toHaveLength(2);
      });
  });

  describe('getById', () => {
    it('find a persom by id', async () => {
      await db('person').insert({ first_name: 'Jack', last_name:'Kan' });
      await db('person').insert({ first_name: 'Sam', last_name:'Tomopol' });
      const Jack = await Person.getById(1);
      const Sam = await Person.getById(2);
      expect(Jack).toMatchObject({ id: 1, first_name: 'Jack', last_name:'Kan' });
      expect(Sam).toMatchObject({ id: 2, first_name: 'Sam', last_name:'Tomopol' });
    });
  });

  describe('getById()', () => {
    it('returns undefined for a non-existent id', async () => {
      const person = await Person.getById(999); 
      expect(person).toBeUndefined();
    });
  });

  describe('person', () => {
    describe('insert()', () => {
      it('inserts provided person into db', async () => {
        await Person.insert({ first_name: 'Jack', last_name:'Kan'});
        let persons = await Person.getAll();
        expect(persons).toHaveLength(1);
  
        await Person.insert({ first_name: 'Sam', last_name:'Tomopol' });
        persons = await Person.getAll();
        expect(persons).toHaveLength(2);
      });
  
    it('gives back the inserted person', async () => {
        let person = await Person.insert({ first_name: 'Jack', last_name:'Kan' });
        expect(person).toMatchObject({ id: 1, first_name: 'Jack', last_name:'Kan' });
        person = await Person.insert({ first_name: 'Sam', last_name:'Tomopol' });
        expect(person).toMatchObject({ id: 2, first_name: 'Sam', last_name:'Tomopol' });
      });
    });
})

describe('insert()', () => {
    it('fails to insert a person with missing fields', async () => {
      try {
        await Person.insert({ first_name: 'John' }); 
      } catch (err) {
        expect(err).toBeDefined();
      }
      const persons = await Person.getAll();
      expect(persons).toHaveLength(0); 
    });
  });
  
 describe('update()', () => {
      it('updates the person', async () => {
        await Person.insert({ first_name: 'Jack', last_name:'Kan' });
        const updated = await Person.update(1, { first_name: 'Jack', last_name:'Kan'});
        expect(updated).toMatchObject({ id: 1, first_name: 'Jack', last_name:'Kan' });
      });
    });

    describe('update()', () => {
        it('returns undefined when trying to update a non-existent person', async () => {
          const updated = await Person.update(999, { first_name: 'Non', last_name: 'Existent' });
          expect(updated).toBeUndefined();
        });
      });
  
  describe('remove()', () => {
      it('deletes the person', async () => {
        await Person.insert({ first_name: 'Jack', last_name:'Kan' });
        await Person.insert({ first_name: 'Sam', last_name:'Tomopol' });
        await Person.remove(1);
        const persons = await db('person');
        expect(persons).toHaveLength(1);
      });
    }); 


 