app.eventView = Backbone.View.extend({

  data: this.model.attributes,
  
  el: '\
    <ul class="list-group">
      <li class="list-group-item">Name: ' + this.data.name + '</li>\
      <li class="list-group-item">Address: ' + this.data.address + '<p></p>' + this.data.city + ', ' + this.data.state + ', ' + this.data.zip + '</li>\
      <li class="list-group-item">Date: ' + this.data.date + '</li>\
      <li class="list-group-item">Venue: ' + this.data.venue + '</li>\
      <li class="list-group-item">Description: ' + this.data.description + '</li>\
    </ul>\
  ',

  initialize: function() {

  },

  // events: {

  // },

  render: function(view) {
    return this.$el;
  }


});

//TODO: we've been naming most views in camelCase, but I noticed that the addOne function
//in CalendarView expects EventView instead of eventView. We should change one.


