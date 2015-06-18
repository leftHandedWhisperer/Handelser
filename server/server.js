  var express     = require('express'),
      db    = require('./db-config');

var app = express();

// configure our server with all the middleware and and routing
require('./middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js
module.exports = app;
