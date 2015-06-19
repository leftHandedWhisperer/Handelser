app.Events = Backbone.Collection.extend({
  model: app.Event,
  url: '/events'
});