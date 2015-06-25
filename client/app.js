window.app = Backbone.View.extend({

  el: document.getElementsByClassName('app'),

  events: {
    'click li a.usersView': 'renderUsersView'
  },

  initialize: function(){
    console.log('app is running');
    app.events = new app.Events();
    app.navbar = new app.navbarView();
    app.mainpage = new app.mainPageView();
    app.sidepage = new app.sidePageView();
    app.pleaseLogin = new app.pleaseLoginView();
    // determine whether or not user is logged in
    // render the nav bar according to that.
    app.router = new app.Router({ el: this.$el.find('.app') });
    Backbone.history.start({ pushState: true });
  },

  // render: function(){
  // },

  renderCalendarView: function(){
    app.router.navigate('/calendar', { trigger: true });
  },

  renderMapView: function(){
    app.router.navigate('/map', { trigger: true });
  },

  renderUsersView: function(){
    console.log('render users view');
    app.router.navigate('/users', { trigger: true });
  }

});

