app.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$el = options.el;
  },

  routes: {
    'calendar': 'showCalendar',
    'users': 'showUsers'
  },

  showCalendar: function(){
    new app.CalendarView();
  },

  showUsers: function(){
    console.log('this is where Id show users... if I had any!!!')
    new app.UsersView();
  }

}); 