app.newEventView = Backbone.View.extend({

  el: '<div> \
    <form id="add-event">\
      <div class="form-group">\
        <label for="name">Name</label>\
        <input type="text" required placeholder="Name" class="form-control" id="name">\
      </div>\
      <div class="form-group">\
        <label for="address">Street Address</label>\
        <input type="text" placeholder="Address" class="form-control" id="address">\
      </div>\
      <div class="form-group">\
        <label for="city">City</label>\
        <input type="text" required placeholder="City" class="form-control" id="city">\
      </div>\
      <div class="form-group">\
        <label for="State">State</label>\
        <input type="text" required placeholder="State" class="form-control" id="state">\
      </div>\
      <div class="form-group">\
        <label for="zip">Zip Code</label>\
        <input type="text" pattern="^\\d{5}(?:[-\\s]\\d{4})?$" placeholder="00000" class="form-control" id="zip">\
      </div>\
      <div class="form-group">\
        <label for="date">Date</label>\
        <input type="date" required placeholder="Date" class="form-control" id="date">\
      </div>\
      <div class="form-group">\
        <label for="time">Time</label>\
        <input type="time" required placeholder="Time" class="form-control" id="time">\
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
    </div> \
  ',

  events: {
    'submit #add-event': 'sendRequest'
  },

  render: function(view) {
    return this.$el;
  },

  sendRequest: function(e) {

    e.preventDefault();

    console.log("current user: ", app.currentUser)
    console.log("date: ", this.$el.find('#date').val())
    console.log("time: ", this.$el.find('#time').val())

    var date = this.$el.find('#date').val();
    var time = this.$el.find('#time').val();

    var dateTime = date + ' ' + time;

    var parsedDate = Date.parse(dateTime);
    var formattedTime = moment(parsedDate).format("YYYY-MM-DD HH:mm:ss");
    var ISOTime = moment(parsedDate).toISOString();
    var parsedISODate = ISOTime.slice(0, 10) + ' ' + ISOTime.slice(11, 19);

    console.log("parsed date: ", formattedTime);
    console.log("iso date: ", ISOTime);
    console.log("parsed iso date: ", parsedISODate);

    var zip = this.$el.find('#zip').val();
    zip = zip ? zip : '00000';
    console.log("zip: ", zip);

    // function AjaxRequest() {

      var newEvent = {
        name: this.$el.find('#name').val(),
        address: this.$el.find('#address').val(),
        city: this.$el.find('#city').val(),
        state: this.$el.find('#state').val(),
        zip: zip,
        date: parsedISODate,
        venue: this.$el.find('#venue').val(),
        description: this.$el.find('#description').val(),
        user_id: app.currentUser.get('id')
      };

      //Google GeoCode
      //http://maps.google.com/maps/api/geocode/json?address=blahblahblah

      this.$el.find('input').val('');
      this.$el.find('textarea').val('');

      //query Google API to see if address is valid
      //if valid

      var addressQuery = [newEvent.venue, newEvent.address, newEvent.city, newEvent.state].join(', ');
      addressQuery = encodeURIComponent(addressQuery);
      console.log('addr query: ', addressQuery);

      $.ajax({
        type: 'GET',
        url: 'https://maps.google.com/maps/api/geocode/json?address=' + addressQuery,
        success: function(data) {
          var loc = data.results[0].geometry.location;
          console.log('location: ', loc);
          console.log('newEvent: ', newEvent);

          newEvent.lat = loc.lat;
          newEvent.long = loc.lng;

          var event = new app.Event(newEvent);
          app.events.create(event);
          app.filterView.renderTourmapView();
        },
        error: function(jqxhr, status, error) {
          console.error('error:', error);
        }
      });

  }


});
