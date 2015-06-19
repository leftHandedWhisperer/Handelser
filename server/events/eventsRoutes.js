var url = require('url');
var eventsController = require('./eventsController.js');

module.exports = function(app) {

  app.get('/', eventsController.getAllEvents);
  app.post('/', eventsController.addEvent);
  app.get('/:event', eventsController.getEvent);

};