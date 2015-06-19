app.logInOutView = Backbone.View.extend({
  id : 'loginout',

  initialize : function() {
    this.logoutView = new LogoutView({});
    this.loginView = new LoginView({});
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
    this.$el.children().detach();
    this.$el.append(this[view].render());
  }
});