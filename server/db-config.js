var sampleUsers = require('./db/userExamples')
var sampleEvents = require('./db/eventExamples')


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
      insertInfoInTable('users', null);
    })
    .catch(function(error) {
      console.log(error);
    });
  } else {
    insertInfoInTable('users', null);
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
      insertInfoInTable('events', null);
    })
    .catch(function(error) {
      console.log(error);
    });
  } else {
    insertInfoInTable('events', null);
  }
});

var tableDataContainsInfo = function(tableData, field, value) {
  for (var i = 0; i < tableData.length; i++) {
    //check for value in field
    if (tableData[i][field] === value) {
      return true;
    }
  }
  return false;
};

var insertInfoInTable = function(tableName, callback) {
  var tableInfo;
  if (tableName === 'users') {
    tableInfo = sampleUsers;
  } else if (tableName === 'events') {
    tableInfo = sampleEvents;
  }

  db.knex.select().table(tableName).then(function(results) {
    var fieldToCheck = 'name';
    if (!tableDataContainsInfo(results, fieldToCheck, tableInfo[0][fieldToCheck])) {
      console.log('inserting sample info in table');
      db.knex(tableName).insert(tableInfo).then(function(insert) {
        db.knex.select().table(tableName).then(function(results) {
          if (callback) {
            callback(results);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  })
  .catch(function(error) {
    console.log(error);
  });
};




module.exports = db;
