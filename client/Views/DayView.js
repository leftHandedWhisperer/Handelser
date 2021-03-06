app.dayView = Backbone.View.extend({ //holds all the information for events

  model: app.Event,

  template: _.template('\
    <h2>Event: <%= name %></h2> \
    <div class="list-group">\
      <a class="list-group-item">Address: <%= address %><p></p><%= city %>, <%= state %>, <%= zip %></a>\
      <a class="list-group-item">Date: <%= shortDate %></a>\
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
    var attributes = this.model.attributes;
    attributes['username'] = app.allUsers.findWhere({id:attributes['user_id']}).get('username');
    attributes['shortDate'] = this.model.shortDate();
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }


});