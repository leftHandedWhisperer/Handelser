app.signupView = Backbone.View.extend({
  el : '\
    <form class="signup">\
      <div class="form-group">\
        <label for="signupUsername>Username</label>\
        <input type="text" class="form-control" id="signupUsername" placeholder="Username" required>\
      </div>\
      <div class="form-group">\
        <label for="signupPassword">Password</label>\
        <input type="password" class="form-control" id="signupPassword" placeholder="Password" required>\
      </div>\
      <div class="form-group">\
        <label for="signupCity">City</label>\
        <input type="text" class="form-control" id="signupCity" placeholder="City" required>\
      </div>\
      <button type="submit" class="btn btn-default">Signup</button>\
    </form>\
  ',

  initialize : function() {
  },

  events : {
    'submit' : 'signup',
  },

  signup : function() {
    console.log('signup')
  },

  render : function(view) {
    return this.$el;
  }
});