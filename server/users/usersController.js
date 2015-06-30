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
    var user_ID = (url.parse(req.url).pathname).slice(1);
    console.log('retrieving info for user_id:' + user_ID);
    var R = Promise.promisify(utils.retrieveUser);
    R(user_ID).then(function(user) {
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

  updateUser: function(req, res) {
    var user_ID = (url.parse(req.url).pathname).slice(1);
    var userInfo = req.body;

    console.log('updating user_id:', user_ID, ' with info: ', userInfo );
    var R = Promise.promisify(utils.updateUser);
    R(user_ID,userInfo).then(function(user) {
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
    res.status(200).end()
  },


  getFollowing: function(req, res) {
    var user_ID = (url.parse(req.url).pathname).slice(8);
    console.log('retrieving followed for user_id:' + user_ID);
    var R = Promise.promisify(utils.retrieveFollowing);
    R(user_ID).then(function(followed) {
      if (followed) {
        res.json(followed);
      } else {
        res.status(404).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
    });
  },

  addFollowing: function(req, res) {
    //the user with user_id is now following the user with following_id
    var follower_id = req.body.follower_id;
    var following_id = req.body.following_id;
    utils.storeFollowing(follower_id, following_id, function() {
      res.status(201).end();
    });
  },

  removeFollowing: function(req, res) {
    var follower_id = req.body.follower_id;
    var unFollowing_id = req.body.unFollowing_id;
    console.log('follower_id: ' + follower_id + ' unFollowing_id: ' + unFollowing_id);
    utils.removeFollowing(follower_id, unFollowing_id, function() {
      res.status(201).end();
    });

  },



};