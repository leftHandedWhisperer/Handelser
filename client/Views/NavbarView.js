app.navbarView = Backbone.View.extend({
  // className : 'loginout',
  el: document.getElementsByClassName('navbar'),

  initialize : function() {
    app.loginout = new app.logInOutView({});
  },

  events : {
    'click li a.calendarView': 'renderCalendarView',
  },

  render : function() {
  },

  renderCalendarView: function(){
    app.router.navigate('/calendar', { trigger: true }); 
  },
});