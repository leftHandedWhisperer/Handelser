var url = require('url');
var utils = require('./eventsUtils');

module.exports = {

  getAllEvents: function(req, res) {
    console.log('retrieving all events');
    utils.retrieveAllEvents().then(function(events) {
      if (events) {
        res.end(events);
      } else {
        res.status(404).end();
      }
    });
  },
  getEvent: function(req, res) {
    var uri = req.url;
    var eventName = (url.parse(uri).pathname).slice(7);
    console.log('retrieving event ' + eventName);
    utils.retrieveEvent(eventName).then(function(foundEvent) {
      if (foundEvent) { 
        res.end(foundEvent);
      } else {
        res.status(404).end();
      }
    });
  },
  addEvent: function(req, res) {
    console.log('adding event');
    utils.addEvent(req.body).then(function(event) {
      if (event) {
        res.status(302).end();
      } else {
        res.status(400).end();
      }
    })
  }

};