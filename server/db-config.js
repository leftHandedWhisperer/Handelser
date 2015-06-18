
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    database: 'database'
  }
});

var db = require('bookshelf')(knex);

// db.createTable = function(tableName, callback) {
//   console.log('should create table: ', tableName);
//   if (tableName === 'dogs') {
//     db.knex.schema.hasTable(tableName).then(function(exists) {
//       if (!exists) {
//         db.knex.schema.createTable(tableName, function(table) {
//           table.increments('id').primary();
//           table.string('name', 255);
//           table.string('breed', 255);
//           table.string('color', 255);
//           table.integer('age');
//         }).then(function(table) {
//           console.log('created table :', tableName);
//           callback(table);
//         });
//       } else {

//       }
//     });
//   } else if (tableName === 'people') {
//     db.knex.schema.hasTable(tableName).then(function(exists) {
//       if (!exists) {
//         db.knex.schema.createTable(tableName, function(table) {
//           table.increments('id').primary();
//           table.string('name', 255);
//           table.string('height', 255);
//           table.integer('age');
//         }).then(function(table) {
//           console.log('created table :', tableName);
//           callback(table);
//         });
//       } else {

//       }
//     });
//   }



// };


module.exports = db;
