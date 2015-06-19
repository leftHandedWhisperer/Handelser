app.loginView = Backbone.View.extend({
  el : '<form class="form-inline login"></form>',

  initialize : function() {
  },

  events : {
    'submit' : 'login',
    'click #signupButton' : 'signup',
  },

  login : function() {
    console.log('logging in')
  },

  signup : function() {
    console.log('signup')
  },

  render : function(view) {
    return this.$el.html('<div class="form-group"><label class="sr-only" for="loginUsername">Username</label><input type="text" class="form-control" id="loginUsername" placeholder="Username"></div><div class="form-group"><label class="sr-only" for="loginPassword">Password</label><input type="password" class="form-control" id="loginPassword" placeholder="Password"></div><button type="submit" class="btn btn-default" id="loginButton">Login</button><input class="btn btn-default" id="signupButton" type="button" value="Signup">');
  }
});