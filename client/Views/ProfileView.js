app.ProfileView = Backbone.View.extend({

  el: '<div>\
        <h2>Your Profile</h2>\
        <div>\
          <h3>Your Information:</h3>\
          <form class="userInfo">\
            <div class="form-group">\
              <label for="userLocation">Location:</label>\
              <input type="text" class="form-control form-control-inline" id="userLocation" required>\
              <input class="btn btn-default" id="userLocationButton" type="button" value="Update">\
            </div>\
          </form>\
          <h3>Users You Follow:</h3>\
          <div id="followingList" class="list-group">\
          </div>\
          <h3>Users Following You:</h3>\
          <div id="followersList" class="list-group">\
          </div>\
        </div>\
      </div>',

  userTemplate: _.template(' <a href="#" class="list-group-item profile">Name: <%= username %></a>'),

  events: {
    'click #userLocationButton': 'updateUserLocation'
  },

  initialize: function() {
    // this.getUserInfo();
  },

  render: function() {
    if (app.currentUser) {
      this.$el.find('#userLocation').val(app.currentUser.city);
      this.getUserInfo(function(data) {
        console.log('data: ', data)
        var follows = data.follows;
        for (var i = 0; i < follows.length; i++) {
          var follow = follows[i];
          $('#followingList').append(this.userTemplate(follow));
        }

        var followers = data.followers;
        for (var i = 0; i < followers.length; i++) {
          var follower = followers[i];
          $('#followerList').append(this.userTemplate(follower));
        }
      })
    }
    return this.$el;
  },

  getUserInfo: function(callback) {
    var that = this;
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8000/users/' + app.currentUser.id,
      success: function(data) {
        callback.call(that, data);
      },
      error: function(jqxhr, status, error) {
        console.error('error:', error);
      }
    });
  },

  updateUserLocation: function() {
    var newUserLoc = this.$el.find('#userLocation').val();
    console.log('updating user loc: ', newUserLoc);

    $.ajax({
      type: 'PUT',
      url: '/users/' + app.currentUser.id,
      data: {
        city: newUserLoc
      },
      success: function(data) {
        console.log('updated user data: ', data);
        app.currentUser = data;
      },
      error: function(jqxhr, status, error) {
        console.error('error:', error);
      }
    });

  }



});
