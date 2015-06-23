app.signupView = Backbone.View.extend({
  el : '\
    <form class="signup">\
      <div class="form-group">\
        <label for="signupUsername">Username</label>\
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
      <input class="btn btn-default" id="signupButton" type="button" value="Signup">\
    </form>\
  ',

  initialize : function() {
  },

  events : {
    'click #signupButton' : 'signup',
  },

  signup : function() {
    console.log('signup')
    var username = this.$el.find('#signupUsername').val();
    var password = this.$el.find('#signupPassword').val();
    var city = this.$el.find('#signupCity').val();

    console.log('username: ',username);
    console.log('password: ',password);
    console.log('city: ', city)
    app.currentUser = new app.User({username:username,password:password,city:city});
    app.currentUser.sync('create',app.currentUser,{url:'/signup'});
  },

  render : function() {
    return this.$el;
  }
});