app.Events = Backbone.Collection.extend({
  model: app.Event,
  url: '/events',
  fetch: function(options) {
    console.log('options: ',options);
    if (!options) {
      options = {};
    }
    options.success = function(data) {
      console.log('setting filteredEvents: ',data);
       app.filteredEvents.set(data.models);
    }
    return Backbone.Collection.prototype.fetch.call(this, options);
  }
});
