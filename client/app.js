window.app = Backbone.View.extend({

  // the app object is on the window and all of the views are made on that object

  el: document.getElementsByClassName('app'),

  events: {
    'click li a.usersView': 'renderUsersView'
  },

  // initializing the app also initializes all of the views necessary  

  initialize: function(){
    console.log('app is running');
    app.events = new app.Events();
    app.filteredEvents = new app.FilteredEvents(app.events.models);
    app.events.fetch();
    app.allUsers = new app.Users();
    app.allUsers.fetch()
    app.navbar = new app.navbarView();
    app.mainpage = new app.mainPageView();
    app.sidepage = new app.sidePageView();
    app.pleaseLogin = new app.pleaseLoginView();
  }

});

