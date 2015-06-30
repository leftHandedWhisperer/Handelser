var usersController = require('./usersController.js');

//return all users

module.exports = function(app) {

  app.use(function(req,res,next) {
    console.log('request method: ',req.method);
    console.log('request url: ',req.url);
    console.log('request body: ',req.body);

    next();
  });

  app.get('/', usersController.getAllUsers); //get all users

  app.post('/signup', usersController.addUser); //add a user

  app.post('/login', usersController.loginUser); //check a user on login

  app.get('/logout', usersController.logoutUser); //logout a user

  app.post('/follow', usersController.addFollowing);  // add a user to follow

  app.post('/unfollow', usersController.removeFollowing);  // remove a user that was followed

  app.get('/:user', usersController.getUser); //get one user

  app.put('/:user', usersController.updateUser); //update a user



};

