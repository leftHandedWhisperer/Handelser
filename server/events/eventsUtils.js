var db = require('../db-config');
var Events = require('../collections/events');
var Event = require('../models/event');


module.exports = {

  //all these utils are fired from eventsController to access the postgres DB

  //get all events from DB
  retrieveAllEvents: function(callback) {
    Events.reset().fetch().then(function(events) {
      callback(null,events);
    })
    .catch(function(error) {
      console.log('error:', error);
    });
  },

  //get one events from DB by ID
  retrieveEvent: function(eventID,callback) {
    new Event({ id: eventID }).fetch({withRelated: ['user'], require: true}).then(function(found) {
      if (found) {
        callback(null,found.attributes);
      } else {
        console.log('event not found:' + eventName);
      }
    })
    .catch(function(error) {
      console.log('error:', error);
    });
  },

  //set new event to DB
  storeEvent: function(event,callback) {

    var name = event.name;
    var description = event.description;
    var venue = event.venue;
    var date = event.date;
    var address = event.address;
    var city = event.city;
    var state = event.state;
    var zip = event.zip;
    var user_id = event.user_id;
    var lat = event.lat;
    var long = event.long;

    new Event({name:name}).fetch().then(function(found) {
      if (found) {
        console.log('event already found: ',found.attributes);
        callback(null,found.attributes);
      } else {

        var event = new Event({name:name,description:description,venue:venue,date:date,address:address,city:city,state:state,zip:zip,user_id:user_id,lat:lat,long:long});

        event.save().then(function(newEvent) {
          console.log('saved event: ',newEvent);

          Events.add(newEvent);
          callback(null,newEvent);
        })
        .catch(function(error) {
          console.log('error:', error);
        });
      }
    })
    .catch(function(error) {
      console.log('error:', error);
    });
  }

};