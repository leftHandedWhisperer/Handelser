app.mainPageView = Backbone.View.extend({
  el: document.getElementsByClassName('mainView'),

  // creates the "home page"
  initialize: function() {
    app.calendar = this.calendar = new app.calendarView({collection: app.filteredEvents});
    app.signup = this.signup = new app.signupView({});
    app.tourmap = this.tourmap = new app.tourMapView({collection: app.filteredEvents});
    app.dayEvent = this.dayEvent = new app.dayEventView({});
    app.filter = this.filter = new app.filterView({});
    this.render('tourmap');
  },

  events: {},

  render: function(views) {
    this.$el.children().detach();
    this.$el.append(this['filter'].render());
    views = views.split(' ');
    for (var view in views) {
      this.$el.append(this[views[view]].render());
      if (views[view] === 'calendar') this.calendar.$el.fullCalendar('today');
      else if (views[view] === 'tourmap') this.tourmap.render(true)
    }
  }
});
