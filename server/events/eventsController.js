var url = require('url');
var utils = require('./eventsUtils');
var Promise = require('bluebird')

module.exports = {

  getAllEvents: function(req, res) {
    console.log('retrieving all events');
    var R = Promise.promisify(utils.retrieveAllEvents);
    R().then(function(events) {
      if (events) {
        res.json(events);
      } else {
        res.status(404).end();
      }
    });
  },
  getEvent: function(req, res) {
    var uri = req.url;
    var eventID = (url.parse(uri).pathname).slice(1);
    console.log('retrieving event ' + eventID);
    var R = Promise.promisify(utils.retrieveEvent);
    R(eventID).then(function(foundEvent) {
      if (foundEvent) {
        res.json(foundEvent);
      } else {
        res.status(404).end();
      }
    });
  },
  addEvent: function(req, res) {
    console.log('adding event: ',req.body);
    var R = Promise.promisify(utils.storeEvent);
    R(req.body).then(function(event) {
      if (event) {
        res.json(event);
      } else {
        res.status(400).end();
      }
    })
  }

};