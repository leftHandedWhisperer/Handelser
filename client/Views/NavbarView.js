app.navbarView = Backbone.View.extend({
  // className : 'loginout',
  el: document.getElementsByClassName('navbar'),

  initialize : function() {
    app.loginout = new app.logInOutView({});
    app.addNewEvent = new app.newEventView({});
  },

  events : {
    'click li #calendarButton': 'renderCalendarView',
    'click #newEvent': 'newEvent' 
  },

  render : function() {
  },

  newEvent: function() {
    console.log('adding newEventView');
    this.$el.append(app.addNewEvent.render());
  },

  renderCalendarView: function(){
    // app.router.navigate('/calendar', { trigger: true });
    app.mainpage.render('calendar');
  },
});