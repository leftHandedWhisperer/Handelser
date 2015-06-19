var db = require('../db-config');
var User = require('./user');

console.log('User model: ',User);
var Event = db.Model.extend({
  tableName: 'events',
  hasTimestamps: false,  //CAN CHANGE THIS LATER, ALSO UPDATE DB-CONFIG IF SO
  // defaults: {
  //   visits: 0
  // },
  initialize: function(){
    // this.on('creating', function(model, attrs, options){

    // });
  },
  user: function() {
    return this.belongsTo(User, 'user_id');
  }
});

module.exports = Event;