var db = require('../db-config');
var Users = require('../collections/users');
var User = require('../models/user');
var Follower = require('../models/follower');

function cleanAttributes (attributes) {
  var result = {};
  for (var key in attributes) {
    if (key === 'password') {
    } else if (key.charAt(0) === '_') {
    } else {
      result[key] = attributes[key];
    }
  }
  return result;
};

module.exports = {

  retrieveAllUsers: function(callback) {
    Users.reset().fetch().then(function(users) {
        callback(null, users.models)
      })
      .catch(function(error) {
        console.log('error:', error);
      });
  },
  retrieveUser: function(user_id, callback) {
    new User({
        id: user_id
      }).fetch({
        withRelated: ['events', 'follows', 'followers'],
        require: true
      }).then(function(found) {
        if (found) {
          var userWithJoins = cleanAttributes(found.attributes);

          userWithJoins.events = [];
          found.relations.events.forEach(function(item) {
             userWithJoins.events.push(cleanAttributes(item.attributes));
          });

          userWithJoins.follows = [];
          found.relations.follows.forEach(function(item) {
            userWithJoins.follows.push(cleanAttributes(item.attributes));
          });

          userWithJoins.followers = [];
          found.relations.followers.forEach(function(item) {
            userWithJoins.followers.push(cleanAttributes(item.attributes));
          });

          callback(null, userWithJoins);
        } else {
          console.log('user_id not found:' + user_id);
        }
      })
      .catch(function(error) {
        console.log('error:', error);
      });
  },
  storeUser: function(user, callback) {
    var username = user.username;
    var password = user.password;
    var city = user.city;

    new User({
        username: username
      }).fetch().then(function(found) {

        if (found) {
          callback(null, found.attributes);
          console.log('user already found:', username);

        } else {

          var user = new User({
            username: username,
            password: password,
            city: city
          });

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

  loginUser: function(user, callback) {
    var username = user.username;
    var password = user.password;

    new User({
        username: username
      }).fetch().then(function(found) {

        if (found) {
          found.comparePassword(password, function(err, isMatch) {
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

  checkUserSession: function(req, res, next) {
    if (!exports.isLoggedIn(req)) {
      // res.redirect('/login');
      console.error("Error: User not logged in");
    } else {
      next();
    }
  },

  storeFollowing: function(follower_id, followed_id, callback) {

    if (followed_id === follower_id) {
      console.log('user cannot follow self');
      callback(null, null);
      return;
    }

    if (!followed_id || !follower_id) {
      console.log('follower or following is null');
      callback(null, null);
      return;
    }

    new Follower({follower_id:follower_id,followed_id:followed_id}).fetch().then(function(found) {
      if (found) {
        callback(null, found.attributes);
        console.log('user_id: ',follower_id, ' is already following user_id: ',followed_id);
      } else {

        new Follower({follower_id:follower_id,followed_id:followed_id})
        .save().then(function(relationship) {
           console.log('new user relationship: ',relationship.attributes);

            callback(null, relationship.attributes);
          })
          .catch(function(error) {
            console.log('error:', error);
          });
      }
    });

  }
};
