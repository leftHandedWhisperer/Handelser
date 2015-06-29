app.sidePageView = Backbone.View.extend({
  // className : 'loginout',
  el: document.getElementsByClassName('sideView'),

  initialize : function() {
    app.newEvent = this.newEvent = new app.newEventView({});
    app.signup = this.signup = new app.signupView({});
    app.profile = this.profile = new app.ProfileView({model: app.currentUser});

  },

  events : {
  },

  render : function(views) {
    this.$el.children().detach();
    views = views.split(' ');
    for (var view in views) {
      if (views[view] === 'users') app.users = this.users = new app.UsersView({collection: app.allUsers})
      this.$el.append(app[views[view]].render());
    }
  }
});