app.publicProfileView = Backbone.View.extend({

  el: '<div>\
      </div>',

  mainTemplate: _.template('<h2><%= username %></a>\'s Info</h2>\
    <div>\
      <h3>Profile:</h3>\
      <div id="userLocation"><a href="#" class="list-group-item profile">Location: <%= city %></a></div>\
      <h3>Events:</h3>\
      <div id="eventList" class="list-group">\
      </div>\
      <h3>Users Following:</h3>\
      <div id="followingList" class="list-group">\
      </div>\
    </div>'),

  userTemplate: _.template(' <a href="#" class="list-group-item profile userlink" id="<%= id %>">Name: <%= username %></a>'),

  eventTemplate: _.template(' <a href="#" data="<%= id %>" class="list-group-item profile">Name: <%= name %></a>'),

  events: {
    'click #eventList': 'eventClick',
    'click .userlink': 'viewUser',
  },

  viewUser : function(event) {
    app.otherUser = new app.publicProfileView({model: app.allUsers.findWhere({id:parseInt(event.target.id)})});
    app.sidepage.render('otherUser');
  },

  render: function() {
    this.$el.children().detach();
    if (this.model) {
      this.$el.append(this.mainTemplate(this.model.attributes));
      this.$el.find('#userLocation').val(this.model.get('city'));
      this.getUserInfo(this.model.get('id'), function(data) {
        var follows = data.follows;
        for (var i = 0; i < follows.length; i++) {
          var follow = follows[i];
          $('#followingList').append(this.userTemplate(follow));
        }
        var events = app.events.where({user_id:this.model.get('id')})
        for (var i = 0; i < events.length; i++) {
          var event = events[i];
          $('#eventList').append(this.eventTemplate(event.attributes));
        }
      })
    }
    return this.$el;
  },

  getUserInfo: function(id, callback) {
    var that = this;
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8000/users/' + id,
      success: function(data) {
        callback.call(that, data);
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
