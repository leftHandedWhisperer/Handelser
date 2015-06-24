var url = require('url');
var utils = require('./usersUtils');
var Promise = require('bluebird')

module.exports = {

  getAllUsers: function(req, res) {
    console.log('retrieving users');
    var R = Promise.promisify(utils.retrieveAllUsers);
    R().then(function(users) {
      if (users) {
        res.json(users);
      } else {
        res.status(404).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
    });
  },

  getUser: function(req, res) {
    var username = (url.parse(req.url).pathname).slice(1);
    console.log('retrieving username:' + username);
    var R = Promise.promisify(utils.retrieveUser);
    R(username).then(function(user) {
      if (user) {
        res.json(user);
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
    });
  },

  addUser: function(req, res) {
    console.log('adding user: ',req.body);
    var R = Promise.promisify(utils.storeUser);
    R(req.body).then(function(data) {
      if (data) {
        res.json(data);
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
    });
  },

  loginUser: function(req, res) {
    console.log('checking user: ',req.body);
    var R = Promise.promisify(utils.loginUser);
    R(req.body).then(function(data) {
      if (data) {
        utils.createSession(req, res, data);
        res.json(data);
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
      res.status(500).end();
    });
  },

  logoutUser: function(req, res) {
    req.session.destroy(function(){
      console.log('session destroyed');
        // res.redirect('/login');
      });
    res.status(200).end();
  },

  addFollowing: function(req, res) {
    //the user with user_id is now following the user with following_id
    var user_id = req.body.user_id;
    var following_id = req.body.following_id;
    u.addFollowing(user_id, following_id, function() {
      res.status(201).end();
    });
  }

};