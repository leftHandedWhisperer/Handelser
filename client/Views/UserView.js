app.userView = Backbone.View.extend({
  el : '\
    <ul class="nav navbar-nav navbar-right user">\
      <p class="navbar-text" id="settingsButton">Settings</p>\
      <li class="dropdown">\
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></a>\
        <ul class="dropdown-menu">\
          <li><a href="#">Action</a></li>\
          <li><a href="#">Another action</a></li>\
          <li><a href="#">Something else here</a></li>\
          <li role="separator" class="divider"></li>\
          <li><a href="#">Separated link</a></li>\
          <li role="separator" class="divider"></li>\
          <li><a href="#">One more separated link</a></li>\
        </ul>\
      </li>\
    </ul>\
  ',

  initialize : function() {
    console.log(app.currentUser);
    this.$el.find('.dropdown-toggle').html(app.currentUser.username + '<span class="caret"></span>');
  },

  events : {
    'click #settingsButton' : 'settings',
  },

  settings: function() {
    console.log('rendering settings');
  },

  render : function() {
    return this.$el;
  }
});