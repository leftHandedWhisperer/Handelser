app.logInOutView = Backbone.View.extend({
  // className : 'loginout',
  el: document.getElementsByClassName('loginout'),

  initialize : function() {
    this.loginView = new app.loginView({});
    this.logoutView = new app.logoutView({});
    this.viewLogin();
  },

  events : {
    'app_loggedInState' : 'viewLogout', //login trigger
    'app_loggedOutState' : 'viewLogin', //logout trigger
  },

  viewLogin : function() {
    this.render('loginView');
  },

  viewLogout : function() {
    this.render('logoutView');
  },

  render : function(view) {
    console.log('in the loginoutview render function')
    this.$el.children().detach();
    this.$el.append(this[view].render());
  }
});