app.Events = Backbone.Collection.extend({
  model: app.Event,
  url: '/events',
  fetch: function(options) {
    console.log('options: ',options);
    if (!options) {
      options = {};
    }
    //app.filteredEvents refers to the events that are currently visible to the client
    options.success = function(data) {
      console.log('setting filteredEvents: ',data);
       app.filteredEvents.reset(data.models);
    }
    return Backbone.Collection.prototype.fetch.call(this, options);
  }
});
