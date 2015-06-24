app.newEventView = Backbone.View.extend({

  data: this.model.attributes,
  
  el: '\
    <form id="add-event">\
      <div class="form-group">\
        <label for="name">Name</label>\
        <input type="text" placeholder="Name" class="form-control" id="name">\
      </div>\
      <div class="form-group">\
        <label for="address">Street Address</label>\
        <input type="text" placeholder="Address" class="form-control" id="address">\
      </div>\
      <div class="form-group">\
        <label for="city">City</label>\
        <input type="text" placeholder="City" class="form-control" id="city">\
      </div>\
      <div class="form-group">\
        <label for="State">State</label>\
        <input type="text" placeholder="State" class="form-control" id="state">\
      </div>\
      <div class="form-group">\
        <label for="zip">Zip Code</label>\
        <input type="number" placeholder="Zip Code" class="form-control" id="zip">\
      </div>\
      <div class="form-group">\
        <label for="date">Date</label>\
        <input type="date" placeholder="Date" class="form-control" id="date">\
      </div>\
      <div class="form-group">\
        <label for="venue">Venue</label>\
        <input type="text" placeholder="Venue" class="form-control" id="venue">\
      </div>\
      <div class="form-group">\
        <label for="description">Description</label>\
        <input type="text" placeholder="Description" class="form-control" id="description">\
      </div>\
      <button type="submit" class="btn btn-primary">Submit</button>\
    </form>\
  ',

  events: {
    'submit #add-event' : 'sendRequest'
  },

  render: function(view) {
    return this.$el;
  }

  sendRequest: function(e) {

    e.preventDefault();

    var newEvent = {
      name: this.$el.find('#name').val(),
      address: this.$el.find('#address').val(),
      city: this.$el.find('#city').val(),
      state: this.$el.find('#state').val(),
      zip: this.$el.find('#zip').val(),
      date: this.$el.find('#date').val(),
      venue: this.$el.find('#venue').val(),
      description: this.$el.find('#description').val()
      //might need to add a user_id field here, not sure where we're storing that yet
    }

    this.$el.find('input').val('');
    this.$el.find('textarea').val('');

    //query Google API to see if address is valid
    //if valid

    $.ajax({
      type: 'POST',
      url: '/events',
      data: JSON.stringify(newEvent),
      dataType: 'application/JSON',
      success: function(data) {
        console.log('new event submitted');
      },
      error: function(error) {
        console.error;
      }
    });
  }
});
