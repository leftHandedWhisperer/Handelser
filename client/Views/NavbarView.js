app.navbarView = Backbone.View.extend({

  el: document.getElementsByClassName('navbar'),

  initialize : function() {
    app.loginout = this.loginout = new app.logInOutView({});
  },

  events : {
    'click li #calendarButton': 'renderCalendarView',
    'click li #mapButton': 'renderMapView',
  },

  render : function() {
  },

  renderCalendarView: function(){
    app.mainpage.render('calendar dayEvent');
  },

  renderMapView: function(){
	  app.mainpage.render('tourmap');
  }
});