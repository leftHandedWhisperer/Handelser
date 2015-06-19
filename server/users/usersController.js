var url = require('url');
var utils = require('./usersUtils');

module.exports = {

  getAllUsers: function(req, res) {
    console.log('retrieving users');
    utils.retrieveAllUsers.then(function(users) {
      if (users) {
        res.end(users);
      } else {
        res.status(404).end();
      }
    });
  },

  getUser: function(req, res) {
    var uri = req.url;
    var username = (url.parse(uri).pathname).slice(6);
    console.log('retrieving username ' + username);
    utils.retrieveUser({username: username}).then(function(user) {
      if (user) {
        res.end(user); 
      } else {
        res.status(404).end();
      }
    });
  },

  addUser: function(req, res) {
    console.log('adding user');
    utils.storeUser(req.body).then(function(data) {
      if (data) {
        res.status(302).end();
      } else {
        res.status(400).end();
      }
    });
  }

};