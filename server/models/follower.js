var db = require('../db-config');

//this is for our join table of users following users
var Follower = db.Model.extend({
  tableName: 'followers',
  hasTimestamps: false
});

module.exports = Follower;