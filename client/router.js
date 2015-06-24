app.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$el = options.el;
  },

  // routes: {
  //   'calendar': 'showCalendar',
  //   'users': 'showUsers',
  //   'signup' : 'showSignup',
  // },

  // showCalendar: function(){
  //   app.mainpage.render('calendar');
  // },

  // showUsers: function(){
  //   new app.UsersView();
  // },

  // showSignup: function() {
  //   app.mainpage.render('signup')
  // },

  // loggedIn: function() {
  //   console.log('logged in');
  //   //add logged in views
  // }

});