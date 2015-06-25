app.navbarUserView = Backbone.View.extend({
  el : '\
    <ul class="nav navbar-nav navbar-right user">\
      <li class="dropdown">\
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></a>\
        <ul class="dropdown-menu">\
          <li><a href="#" id="newEventButton">Add Event</a></li>\
          <li><a href="#">Follow Another User</a></li>\
          <li role="separator" class="divider"></li>\
          <li><a href="#" id="profileButton">Your Profile</a></li>\
        </ul>\
      </li>\
    </ul>\
  ',

  initialize : function() {
    this.friends = '';
    console.log(app.currentUser);
    this.$el.find('.dropdown-toggle').html(app.currentUser.username + '<span class="caret"></span>');
  },

  events : {
    'click #settingsButton' : 'settings',
    'click #newEventButton': 'renderNewEventView',
    'click #profileButton': 'renderProfileView'
  },

  settings: function() {
    console.log('rendering settings');
  },

  render : function() {
    return this.$el;
  },

  renderNewEventView: function(){
    // app.router.navigate('/calendar', { trigger: true });
    if (app.currentUser) app.sidepage.render('newEvent');
    else app.sidepage.render('pleaseLogin');
  },

  renderProfileView: function(){
    // app.router.navigate('/calendar', { trigger: true });
    if (app.currentUser) app.sidepage.render('profile');
    else app.sidepage.render('pleaseLogin');
  },
});