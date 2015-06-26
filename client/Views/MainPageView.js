app.mainPageView = Backbone.View.extend({
  el: document.getElementsByClassName('mainView'),

  initialize: function() {
    app.calendar = this.calendar = new app.calendarView({collection: app.events});
    app.signup = this.signup = new app.signupView({});
    app.tourmap = this.tourmap = new app.tourMapView({collection: app.events});
    app.dayEvent = this.dayEvent = new app.dayEventView({});
  },

  events: {},

  render: function(views) {
    this.$el.children().detach();
    views = views.split(' ');
    for (var view in views) {
      this.$el.append(this[views[view]].render());
      if (views[view] === 'calendar') this.calendar.$el.fullCalendar('today');
      else if (views[view] === 'tourmap') this.tourmap.render(true)
    }
  }
});
