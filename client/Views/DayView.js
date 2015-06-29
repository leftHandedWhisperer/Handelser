app.dayView = Backbone.View.extend({

  model: app.Event,

  template: _.template('\
    <h2>Event: <%= name %></h2> \
    <div class="list-group">\
      <a class="list-group-item">Address: <%= address %><p></p><%= city %>, <%= state %>, <%= zip %></a>\
      <a class="list-group-item">Date: <%= date %></a>\
      <a class="list-group-item">Venue: <%= venue %></a>\
      <a class="list-group-item">Description: <%= description %></a>\
      <a class="list-group-item">Event Creator: <%= username %></a>\
    </div>\
  '),

  initialize: function() {
  },

  events: {
    // 'click ul' :
  },

  render: function(view) {
    console.log('data', this.data)
    var attributes = this.model.attributes;
    attributes['username'] = app.allUsers.findWhere({id:attributes['user_id']}).get('username');
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }


});