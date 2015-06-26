app.loginView = Backbone.View.extend({

  model: app.User,

  el : '\
    <form class="form-inline login">\
      <div class="form-group">\
        <label class="sr-only" for="loginUsername">Username</label>\
        <input type="text" class="form-control" id="loginUsername" placeholder="Username" required>\
      </div>\
      <div class="form-group">\
        <label class="sr-only" for="loginPassword">Password</label>\
        <input type="password" class="form-control" id="loginPassword" placeholder="Password" required>\
      </div>\
      <input class="btn btn-default" id="loginButton" type="button" value="Login">\
      <input class="btn btn-default" id="signupButton" type="button" value="Signup">\
    </form>\
  ',

  initialize : function() {
  },

  events : {
    'click #loginButton' : 'login',
    'click #signupButton' : 'signup',
  },

  login : function(event, username, password) {
    var username = username || this.$el.find('#loginUsername').val();
    var password = password || this.$el.find('#loginPassword').val();

    $.post('/users/login', {'username': username, 'password': password})
      .done(function(data) {
        console.log('logging in: ', data);
        //this is setting current user to data, not a true User instance
        app.currentUser = data;
        app.loginout.viewLogout();
        app.userNavProfile = new app.navbarUserView();
        app.navbar.$el.find('.collapse').append(app.userNavProfile.render());
        app.sidepage.render('profile');
      }).fail(function() {
        console.log('login error');
      });
  },

  signup : function() {
    // app.router.navigate('/signup', { trigger: true });
    app.sidepage.render('signup')
  },

  render : function() {
    return this.$el;
  }
});