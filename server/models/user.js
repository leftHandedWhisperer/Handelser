var db = require('../db-config');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: false, //CAN CHANGE THIS LATER, ALSO UPDATE DB-CONFIG IF SO
  events: function() {
    //invoking require at runtime so we avoid circular dependency
    var Event = require('./event');
    return this.hasMany(Event);
  },
  initialize: function(){
    // this.on('creating', this.hashPassword);
  }
});

module.exports = User;