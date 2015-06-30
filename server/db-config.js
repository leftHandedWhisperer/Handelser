var sampleUsers = require('./db/userExamples')
var sampleEvents = require('./db/eventExamples')

//prod is a copy of the DATABASE_URL environment variable
var prodConnectionString = 'postgres://hbkuimaybryhch:0gFQCqUGNsMaOOZcmkYVzRcaAz@ec2-54-83-18-87.compute-1.amazonaws.com:5432/d9opd1ipu4em4v';
var devConnectionString = 'postgres://127.0.0.1:5432/database';

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || devConnectionString
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
      table.integer('user_id');
      table.string('name', 255);
      table.string('description', 255);
      table.string('venue', 255);
      table.dateTime('date');
      table.string('address', 255);
      table.string('city', 255);
      table.string('state', 255);
      table.string('zip',10);
      table.float('lat');
      table.float('long');


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

//this is for the followers join table
db.knex.schema.hasTable('followers').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('followers', function(table) {
      table.increments('id').primary();
      table.integer('follower_id');
      table.integer('followed_id');

    }).then(function(table) {
      console.log('created table :', 'followers');
    })
    .catch(function(error) {
      console.log(error);
    });
  } else {
  }
});

//check if example data is already in table, if it is we wont add it to the DB
var tableDataContainsInfo = function(tableData, field, value) {
  for (var i = 0; i < tableData.length; i++) {
    //check for value in field
    if (tableData[i][field] === value) {
      return true;
    }
  }
  return false;
};

//insert example data (from JSON objects) into DB
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
