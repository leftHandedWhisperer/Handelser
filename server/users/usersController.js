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
        res.status(404).end();
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
        res.status(400).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
    });
  }

};