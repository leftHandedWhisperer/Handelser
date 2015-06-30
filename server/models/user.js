var db = require('../db-config');
var Promise = require('bluebird');
var bcrypt = require('bcrypt');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: false, //CAN CHANGE THIS LATER, ALSO UPDATE DB-CONFIG IF SO
  events: function() {
    //invoking require at runtime so we avoid circular dependency on Event
    var Event = require('./event');
    return this.hasMany(Event);
  },
  initialize: function(){
    this.on('creating', this.hashPassword);
  },

  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(err, isMatch);
    });
  },

  hashPassword: function(){
    var cipher = Promise.promisify(bcrypt.hash);
    // return a promise - bookshelf will wait for the promise
    // to resolve before completing the create action
    return cipher(this.get('password'), 10)
      .bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  },

  //bookshelf join on users this user follows through the followers table
  follows: function() {
    var Follower = require('./follower');
    return this.belongsToMany(User,'followers', 'follower_id', 'followed_id');
  },

  //bookshelf join on people following this user through the followers table
  followers: function() {
    var Follower = require('./follower');
    return this.belongsToMany(User,'followers', 'followed_id', 'follower_id');
  },

});

module.exports = User;