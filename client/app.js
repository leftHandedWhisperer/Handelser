window.app = Backbone.View.extend({

  el: document.getElementsByClassName('app'),

  events: {
    'click li a.calendarView': 'renderCalendarView',
    'click li a.usersView': 'renderUsersView'
  },

  initialize: function(){
    console.log( 'app is running');
    this.loginout = new app.logInOutView({});
    // determine whether or not user is logged in
    // render the nav bar according to that.
    this.router = new app.Router({ el: this.$el.find('.col-md-8') });
    Backbone.history.start({ pushState: true });
  },

  // render: function(){
  // },

  renderCalendarView: function(){
    this.router.navigate('/calendar', { trigger: true });
  },

  renderUsersView: function(){
    console.log('render users view');
    this.router.navigate('/users', { trigger: true });
  }

});

