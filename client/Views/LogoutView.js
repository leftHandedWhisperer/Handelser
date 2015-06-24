app.logoutView = Backbone.View.extend({
  el : '\
  <form class="form-inline logout">\
    <input class="btn btn-default" id="logoutButton" type="button" value="Logout">\
  </form>\
  ',

  initialize : function() {
  },

  events : {
    'click #logoutButton' : 'logout',
  },

  logout : function() {
    console.log('????')
    $.get('/users/logout')
      .done(function() {
        console.log('logging out');
        app.loginout.viewLogin();
      }).fail(function() {
        console.log('logout error');
      });
  },

  render : function(view) {
    return this.$el;
  }
});