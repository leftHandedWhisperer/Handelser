app.sidePageView = Backbone.View.extend({
  // className : 'loginout',
  el: document.getElementsByClassName('sideView'),

  initialize : function() {
    app.newEvent = this.newEvent = new app.NewEventView({});
    app.signup = this.signup = new app.signupView({});
    app.profile = this.profile = new app.ProfileView({});
  },

  events : {
  },

  render : function(view) {
    this.$el.children().detach();
    this.$el.append(app[view].render());
  }
});