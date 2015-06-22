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

  app.get('/:user', usersController.getUser); //get one user

};

