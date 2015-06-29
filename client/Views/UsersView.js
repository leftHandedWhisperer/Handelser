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
    'click #followUser' : 'followUser'
  },

  addAll: function(){
    this.collection.forEach(function(item){
      console.log(item.get('name'));
    }, this)
  },

  render: function() {
    console.log('rendering in the usersView')
    console.log(this.collection)
    this.collection.forEach(function(user){
      console.log('for each in users view')
      this.$el.append(this.template(user.attributes));
    }, this)
  },

  followUser: function(e){
    console.log(e.target.attributes)
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
        console.log('before change ', e.target.attributes.id.value)
        $(e.target.attributes.id.value).val("unFollowUser");
        console.log('after change ', e.target.attributes.id.value)
        $(e.target.attributes.value.value).val("unFollowUser");
      },
      error: function(jqxhr, status, error) {
        console.error('error:', error);
      }
    });
  },

  unfollowUser: function(e) {
    console.log('unfollowing user')
  }

});