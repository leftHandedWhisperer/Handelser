app.sidePageView = Backbone.View.extend({
  // className : 'loginout',
  el: document.getElementsByClassName('col-md-4'),

  initialize : function() {
    app.newEvent = this.newEvent = new app.newEventView({});
  },

  events : {
  },

  render : function(view) {
    this.$el.children().detach();
    this.$el.append(app[view].render());
  }
});