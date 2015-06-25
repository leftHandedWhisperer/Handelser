var db = require('../db-config');
var Users = require('../collections/users');
var User = require('../models/user');


module.exports = {

  retrieveAllUsers: function(callback) {
    Users.reset().fetch().then(function(users) {
      callback(null, users.models)
    })
    .catch(function(error) {
      console.log('error:', error);
    });
  },
  retrieveUser: function(username,callback) {
    new User({ username: username }).fetch({withRelated: ['events'], require: true}).then(function(found) {
      if (found) {
        var userWithEvents = found.attributes;
        userWithEvents.events = found.relations.events;

        callback(null,userWithEvents);
      } else {
        console.log('user not found:' + username);
      }
    })
    .catch(function(error) {
      console.log('error:', error);
    });
  },
  storeUser: function(user,callback) {
    var username = user.username;
    var password = user.password;
    var city = user.city;

    new User({username:username}).fetch().then(function(found) {

      if (found) {
        callback(null, found.attributes);
        console.log('user already found:', username);

      } else {

        var user = new User({username:username,password:password,city:city});

        user.save().then(function(newUser) {
          Users.add(newUser);
          callback(null, newUser);
        })
        .catch(function(error) {
          console.log('error:', error);
        });
      }
    })
    .catch(function(error) {
      console.log('error:', error);
    });
  },

  loginUser: function(user,callback) {
    var username = user.username;
    var password = user.password;

    new User({username:username}).fetch().then(function(found) {

      if (found) {
        found.comparePassword(password,function(err, isMatch) {
          if (err) console.log('error: ', err);
          if (isMatch) {
            //do sessions
            console.log('user authenticated');
            callback(null, found.attributes);
          } else {
            console.log('password incorrect');
            callback(null, null);
          }
        });

      } else {

        console.log('user not found');
      }
    })
    .catch(function(error) {
      console.log('error:', error);
    });
  },

  createSession: function(req, res, newUser) {
    return req.session.regenerate(function() {
        req.session.user = newUser;
        // res.redirect('/');
      });
  },

  isLoggedIn: function(req, res) {

    return req.session ? !!req.session.user : false;
  },

  checkUserSession: function(req, res, next){
    if (!exports.isLoggedIn(req)){
      // res.redirect('/login');
      console.error("Error: User not logged in");
    } else {
      next();
    }
  },

  addFollowing: function(user_id, following_id, callback) {
    new User({id:user_id}).fetch().then(function(user) {
      if (user) {
        return user.following().attach(following_id);
      }
    }).then(function() {
      callback();
    }).catch(function(error) {
      console.log(error);
    });
  }

};