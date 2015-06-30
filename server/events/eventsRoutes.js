var url = require('url');
var eventsController = require('./eventsController.js');

module.exports = function(app) {

  //these are routes that have prefix /events (i.e. GET events/2)
  app.get('/', eventsController.getAllEvents);
  app.post('/', eventsController.addEvent);
  app.get('/:event', eventsController.getEvent);

};