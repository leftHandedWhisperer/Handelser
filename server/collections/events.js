var db = require('../db-config');
var Event = require('../models/event');

var Events = new db.Collection();

Events.model = Event;

module.exports = Events;
