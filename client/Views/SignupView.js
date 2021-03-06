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
      <input class="btn btn-default" id="signupButton" type="submit" value="Signup">\
    </form>\
  ',

  events : {
    'submit' : 'signup',
  },

  signup : function(event) {
    event.preventDefault();
    console.log('signup')
    var username = this.$el.find('#signupUsername').val();
    var password = this.$el.find('#signupPassword').val();
    var city = this.$el.find('#signupCity').val();

    console.log('username: ',username);
    console.log('password: ',password);
    console.log('city: ', city)

    $.post('/users/signup', {username: username, password: password, city: city})
      .done(function(data) {
        console.log('signing up: ', data);
        app.allUsers.fetch({
          success: function() {
            if (!app.currentUser) app.login.login(null, username, password);
            app.filter.toggleSideView();
          }
        });
        //this is setting current user to data, not a true User instance
      }).fail(function() {
        console.log('login error');
      });
  },

  render : function() {
    return this.$el;
  }
});