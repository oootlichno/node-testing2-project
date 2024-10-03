const common = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
}

module.exports = {
  development: {
    ...common,
    connection: {
      filename: './data/person.db3', // Your development database file
    },
  },
  testing: {
    ...common,
    connection: {
      filename: './data/test.db3', // Your testing database file
    },
  },
}
