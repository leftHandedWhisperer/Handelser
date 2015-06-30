app.sidePageView = Backbone.View.extend({
  el: document.getElementsByClassName('sideView'),

  initialize : function() {
    app.newEvent = this.newEvent = new app.newEventView({});
    app.signup = this.signup = new app.signupView({});
    app.profile = this.profile = new app.privateProfileView({model: app.currentUser});
  },

  events : {
  },

  // this render function can be called to show various views in the side-page area.
  // this is the area of the screen that comes out from the right when toffled

  render : function(views) {
    
    this.$el.children().detach();
    // add the "hide side view page"
    var hideButton = $('<button class="btn btn-default hide-button">Hide</button>').click(function () { app.filter.toggleSideView() });
    $('.sideView').append(hideButton);
    
    views = views.split(' ');
    for (var view in views) {
      if (views[view] === 'users') app.users = this.users = new app.UsersView({collection: app.allUsers})
      this.$el.append(app[views[view]].render());

    }
  }
});