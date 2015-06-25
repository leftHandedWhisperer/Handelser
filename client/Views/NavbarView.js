app.navbarView = Backbone.View.extend({
  // className : 'loginout',
  el: document.getElementsByClassName('navbar'),

  initialize : function() {
    app.loginout = this.loginout = new app.logInOutView({});
  },

  events : {
    'click li #calendarButton': 'renderCalendarView',
    'click li #newEventButton': 'renderNewEventView',
    'click li #mapButton': 'renderMapView',
  },

  render : function() {
  },

  renderCalendarView: function(){
    // app.router.navigate('/calendar', { trigger: true });
    app.mainpage.render('calendar');
  },

  renderNewEventView: function(){
    // app.router.navigate('/calendar', { trigger: true });
    if (app.currentUser) app.sidepage.render('newEvent');
    else app.sidepage.render('pleaseLogin');
  },

  renderMapView: function(){
    // app.router.navigate('/calendar', { trigger: true });app.mainpage.render('map');
	  app.mainpage.render('tourmap');
  }
});