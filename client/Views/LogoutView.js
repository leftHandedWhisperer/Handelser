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
    $.get('/users/logout')
      .done(function() {
        console.log('logging out');
        app.currentUser = null;
        app.navbar.$el.find('.user').remove();
        app.sidepage.$el.children().detach();
        app.loginout.render('login');
      }).fail(function() {
        console.log('logout error');
      });
  },

  render : function() {
    return this.$el;
  }
});