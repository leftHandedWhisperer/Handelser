app.UsersView = Backbone.View.extend({

  el: document.getElementsByClassName('sideView'),

  template: _.template('\
        <ul class="list-unstyled">\
          <li class="list-group-item-heading"><h5>User: <%= username %></h5></li>\
          <li class="list-group-item-text"><h6>Location: <%= city %></h6></li>\
        </ul>\
        <ul class="list-unstyled">\
          <li class="list-group-item-text followButton"><input type="button" id="followUser" data="<%= id %>" value="Follow" class="btn btn-default"></li>\
        </ul>\
  '),

  initialize: function(){
    // this.render()
    // this.collection.fetch()
  },

  events: {
    'click #followUser' : 'followUser',
    'click #unfollow' : 'unFollowUser'
  },

  addAll: function(){
    this.collection.forEach(function(item){
      console.log(item.get('name'));
    }, this)
  },

  render: function() {
    console.log(this.collection)
    this.collection.forEach(function(user){
      this.$el.append(this.template(user.attributes));
    }, this)
  },

  followUser: function(e){
    var followUser = {
      follower_id: app.currentUser.get('id'),
      following_id: e.target.attributes.data.value
    };

    $.ajax({
      type: 'POST',
      url: '/users/follow',
      data: followUser,
      success: function(data) {
        console.log('successfully followed user '+ e.target.attributes.data.value)
        e.target.value = "Unfollow";
        e.target.id = "unfollow";
      },
      error: function(jqxhr, status, error) {
        console.error('error:', error);
      }
    });
  },

  unFollowUser: function(e) {
    var unFollowUser = {
      follower_id: app.currentUser.get('id'),
      unFollowing_id: e.target.attributes.data.value
    };

    console.log('unfollowing user')
    $.ajax({
      type: 'POST',
      url: '/users/unfollow',
      data: unFollowUser,
      success: function(data) {
        console.log('successfully unfollowed user '+ e.target.attributes.data.value)
        e.target.value = "Follow";
        e.target.id = "followUser";
      },
      error: function(jqxhr, status, error) {
        console.error('error:', error);
      }
    });
  }

});