app.sidePageView = Backbone.View.extend({
  // className : 'loginout',
  el: document.getElementsByClassName('sideView'),

  initialize : function() {
    app.newEvent = this.newEvent = new app.newEventView({});
    app.signup = this.signup = new app.signupView({});
    app.profile = this.profile = new app.ProfileView({});

  },

  events : {
  },

  render : function(view) {
    if (view === 'users'){
      console.log('in render if')
      app.users = this.users = new app.UsersView({collection: app.allUsers})
    }
    this.$el.children().detach();
    this.$el.append(app[view].render());
  }
});