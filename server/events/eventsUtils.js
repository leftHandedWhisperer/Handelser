var db = require('../db-config');
var Events = require('../collections/events');
var Event = require('../models/event');


module.exports = {

  retrieveAllEvents: function() {
    Events.reset().fetch().then(function(events) {
      return events; //do we need callback
    });
  },
  retrieveEvent: function(eventName) {
    new Event({ name: eventName }).fetch().then(function(found) {
      if (found) {
        return found.attributes;
      } else {
        console.log('event not found:' + eventName);
      }
    });
  },
  addEvent: function(event) {
    console.log("event to add to DB: ", event);

    new Event({name:name}).fetch().then(function(found) {
      if (found) {
        return found.attributes;
      } else {

        var event = new Event(event);

        event.save().then(function(newEvent) {
          Events.add(newEvent);
          return newEvent;
        });
      }
    });
  }

};