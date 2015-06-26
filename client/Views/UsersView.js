app.UsersView = Backbone.View.extend({

  template: _.template('\
    <ul class="list-group">\
      <li class="list-group-item">Name: <%= username %></li>\
      <li class="list-group-item">City: <%= city %></li>\
    </ul>\
  '),

  initialize: function(){
    // this.render()
    // this.collection.fetch()
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
    $('body').append(this.$el);
  }


});