app.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$el = options.el;
  },

  routes: {
    'calendar': 'showCalendar',
    'users': 'showUsers'
  },

  showCalendar: function(){
    var events = new app.Events()
    new app.CalendarView({collection: events});
  },

  showUsers: function(){
    console.log('this is where Id show users... if I had any!!!')
    new app.UsersView();
  },

  loggedIn: function() {
    console.log('logged in');
    //add logged in views
  }

});