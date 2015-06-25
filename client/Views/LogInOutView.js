app.logInOutView = Backbone.View.extend({
  // className : 'loginout',
  el: document.getElementsByClassName('loginout'),

  initialize : function() {
    app.login = this.login = new app.loginView({});
    app.logout = this.logout = new app.logoutView({});
    this.viewLogin();
  },

  events : {
    'app_loggedInState' : 'viewLogout', //login trigger
    'app_loggedOutState' : 'viewLogin', //logout trigger
  },

  viewLogin : function() {
    this.render('login');
  },

  viewLogout : function() {
    this.render('logout');
  },

  render : function(view) {
    console.log('in the loginoutview render function')
    this.$el.children().detach();
    this.$el.append(this[view].render());
  }
});