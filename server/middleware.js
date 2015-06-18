var morgan = require('morgan'), // used for logging incoming request
  bodyParser = require('body-parser'),
  cors = require('cors'),
  path = require('path');

module.exports = function(app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  // var lessonRouter = express.Router();

  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../client'));

  // app.use(function(req,res,next) {
  //   console.log(req.url);
  //   if (req.url === '/') {
  //     res.send('../../client/index.html');
  //   }
  //   next();
  // });

  // app.get('/', function(req, res) {
  //   res.sendFile(path.join(__dirname,'/../client/index.html'));
  // });

  // authentication middleware used to decode token and made available on the request
  // app.use('/lessons', lessonRouter); // user link router for link request

  // inject our routers into their respective route files
  // require('./lessons/lessonRouter.js')(lessonRouter);
};
