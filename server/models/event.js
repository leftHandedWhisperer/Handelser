var db = require('../db-config');

var Event = db.Model.extend({
  tableName: 'events',
  hasTimestamps: false,  //CAN CHANGE THIS LATER, ALSO UPDATE DB-CONFIG IF SO
  initialize: function(){

  },
  user: function() {
    //invoking require at runtime so we avoid circular dependency on User
    var User = require('./user');
    return this.belongsTo(User, 'user_id');
  }
});

module.exports = Event;