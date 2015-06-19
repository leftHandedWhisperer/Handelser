var db = require('../db-config');
var Event = require('./event')


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: false, //CAN CHANGE THIS LATER, ALSO UPDATE DB-CONFIG IF SO
  events: function() {
    return this.hasMany(Event);
  },
  initialize: function(){
    // this.on('creating', this.hashPassword);
  }
});

module.exports = User;