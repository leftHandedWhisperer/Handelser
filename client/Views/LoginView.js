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

  login : function() {
    console.log('logging in');
    var username = this.$el.find('#loginUsername').val();
    var password = this.$el.find('#loginPassword').val();

    console.log('username: ',username);
    console.log('password: ',password);
    app.currentUser = new app.User({username:username,password:password});
    app.currentUser.sync('create',app.currentUser,{url:'/login'});
  },

  signup : function() {
    // app.router.navigate('/signup', { trigger: true });
    app.mainpage.render('signup')
  },

  render : function() {
    return this.$el;
  }
});