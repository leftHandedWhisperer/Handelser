app.mainPageView = Backbone.View.extend({
  el: document.getElementsByClassName('col-md-8'),

  initialize: function() {
    app.calendar = this.calendar = new app.calendarView({
      collection: app.events
    });
    app.signup = this.signup = new app.signupView({});
    app.tourmap = this.map = new app.tourMapView({
      collection: app.events
    });

  },

  events: {},

  render: function(view) {
    this.$el.children().detach();
    console.log(view);
    console.log(this[view]);
    this.$el.append(this[view].el);
    this[view].render(true);
    if (view === 'calendar') this.calendar.$el.fullCalendar('today');
    // if (view === 'map') {
    //   this.$el.append(this.map.render());
    // }
  }
});
