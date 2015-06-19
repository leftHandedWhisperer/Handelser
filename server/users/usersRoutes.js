var url = require('url');
var usersController = require('./usersController.js');

//return all users

module.exports = function(app) {

  app.get('/', usersController.getAllUsers); //get all users
  app.post('/', usersController.addUser); //add a user
  app.get('/:user', usersController.getUser); //get one user

}

