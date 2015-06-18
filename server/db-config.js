var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    database: 'database'
  }
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username', 100);
      table.string('password', 100);
      table.string('city', 255);
    }).then(function(table) {
      console.log('created table :', 'users');
    });
  }
});

db.knex.schema.hasTable('events').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('events', function(table) {
      table.increments('id').primary();
      table.string('user_id', 100);
      table.string('name', 255);
      table.string('description', 255);
      table.string('venue', 255);
      table.dateTime('date');
      table.string('address', 255);
      table.string('city', 255);
      table.string('state', 255);
      table.integer('zip');

    }).then(function(table) {
      console.log('created table :', 'events');
    });
  }
});



module.exports = db;
