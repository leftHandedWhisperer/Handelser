var db = require('../db-config');

var Follower = db.Model.extend({
  tableName: 'followers',
  hasTimestamps: false
});

module.exports = Follower;