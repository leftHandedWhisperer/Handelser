app.ProfileView = Backbone.View.extend({

  el: '<div>\
      </div>',

  mainTemplate: _.template('<h2><%= username %></a>\'s Info</h2>\
        <div>\
          <h3>Profile:</h3>\
          <form class="userInfo">\
            <div class="form-group">\
              <label for="userLocation">Location:</label>\
              <input type="text" class="form-control form-control-inline" id="userLocation" required>\
              <input class="btn btn-default" id="userLocationButton" type="button" value="Update">\
            </div>\
          </form>\
          <h3>Events:</h3>\
          <div id="eventList" class="list-group">\
          </div>\
          <h3>Users Following:</h3>\
          <div id="followingList" class="list-group">\
          </div>\
        </div>'),

  userTemplate: _.template(' <a href="#" class="list-group-item profile">Name: <%= username %></a>'),

  eventTemplate: _.template(' <a href="#" data="<%= id %>" class="list-group-item profile">Name: <%= name %></a>'),

  events: {
    'click #userLocationButton': 'updateUserLocation',
    'click #eventList': 'eventClick'
  },

  initialize: function() {
    // this.getUserInfo();
  },

  render: function() {
    this.$el.children().detach();
    console.log('profile view: ',this)
    if (app.currentUser) {
      this.$el.append(this.mainTemplate(this.model.attributes));
      console.log('made it here')
      this.$el.find('#userLocation').val(this.model.get('city'));
      this.getUserInfo(function(data) {
        var follows = data.follows;
        for (var i = 0; i < follows.length; i++) {
          var follow = follows[i];
          $('#followingList').append(this.userTemplate(follow));
        }

        // var followers = data.followers;
        // for (var i = 0; i < followers.length; i++) {
        //   var follower = followers[i];
        //   $('#followerList').append(this.userTemplate(follower));
        // }

        var events = app.events.where({user_id:this.model.get('id')})
        for (var i = 0; i < events.length; i++) {
          var event = events[i];
          $('#eventList').append(this.eventTemplate(event.attributes));
        }
      })
    }
    return this.$el;
  },

  getUserInfo: function(callback) {
    var that = this;
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8000/users/' + this.model.get('id'),
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
      url: '/users/' + this.model.get('id'),
      data: {
        city: newUserLoc
      },
      success: function(data) {
        console.log('updated user data: ', data);
        app.currentUser = app.allUsers.findWhere({id:data.id});
      },
      error: function(jqxhr, status, error) {
        console.error('error:', error);
      }
    });

  },

  eventClick: function(event) {
    console.log(event)
    var eventID =  parseInt(event.target.getAttribute("data"));
    app.sideEvent = new app.dayView({model: app.events.findWhere({id: eventID})});
    app.sidepage.render('sideEvent');
  }


});
