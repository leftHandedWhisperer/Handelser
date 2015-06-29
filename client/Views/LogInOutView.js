app.logInOutView = Backbone.View.extend({
  // className : 'loginout',
  el: document.getElementsByClassName('loginout'),

  initialize : function() {
    app.login = this.login = new app.loginView({});
    app.logout = this.logout = new app.logoutView({});
    this.render('login');
  },

  events : {
    'app_loggedInState' : 'viewLogout', //login trigger
    'app_loggedOutState' : 'viewLogin', //logout trigger
  },

  render : function(view) {
    this.$el.children().detach();
    this.$el.append(app[view].render());
  }
});