var morgan = require('morgan'), // used for logging incoming request
  bodyParser = require('body-parser'),
  cors = require('cors'),
  path = require('path');


module.exports = function(app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  // var lessonRouter = express.Router();

  var usersRouter = new express.Router();
  var eventsRouter = new express.Router();

  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../client'));

  var session = require('express-session');
  app.use(session({
    secret: 'shhh, it\'s a secret',
    resave: false,
    saveUninitialized: true
  }));

  app.use('/users', usersRouter);
  app.use('/events', eventsRouter);

  require('./users/usersRoutes.js') (usersRouter);
  require('./events/eventsRoutes.js') (eventsRouter);

};
