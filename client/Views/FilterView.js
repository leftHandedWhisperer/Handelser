app.filterView = Backbone.View.extend({

  el: '<div id="filterView">\
        <ul class="nav navbar-nav navbar-left"> \
          <form class="form-inline filter">\
            <div class="form-group">\
              <label>Search Location: </label>\
              <input type="text" class="form-control" id="location-filter">\
            </div>\
            <div class="form-group">\
              <label>Radius (mi): </label>\
              <input type="number" class="form-control" id="distance-filter">\
            </div>\
            <div class="form-group">\
              <label>User: </label>\
              <input type="text" class="form-control" id="user-filter">\
            </div>\
            <input class="btn btn-success" id="filter-button" type="button" value="Update">\
          </form>\
        </ul> \
      <div>',


  // renders the d3 map on start
  initialize: function() {
    parseInt(this.$el.find('#distance-filter').val(5000));
    this.$el.find('#location-filter').val('San Francisco, CA');
    this.renderTourmapView();
  },

  events: {
    'click #filter-button': 'renderTourmapView',
    'click #side-toggle-button': 'toggleSideView'
  },

  render: function() {
    return this.$el;
  },

  renderTourmapView: function() {

    var distanceMax = parseInt(this.$el.find('#distance-filter').val());
    distanceMax = distanceMax || 50;

    var location = this.$el.find('#location-filter').val();

    var username = this.$el.find('#user-filter').val();
    var user_id;
    if (app.allUsers && username) {
      var user = app.allUsers.findWhere({
        username: username
      });
      user_id = parseInt(user.get('id'))
      console.log('user id: ', user_id)
    }

    $.ajax({
      type: 'GET',
      url: 'https://maps.google.com/maps/api/geocode/json?address=' + location,
      success: function(data) {

        var loc = data.results[0].geometry.location;

        var events = app.events.filter(function(item) {
          if (user_id) {
            console.log(item.get('user_id'))
            return (item.distanceFromLatLong(loc.lat, loc.lng) <= distanceMax && item.get('user_id') === user_id);
          } else {
            return item.distanceFromLatLong(loc.lat, loc.lng) <= distanceMax;
          }
        });

        console.log('filtered events: ', events);

        app.filteredEvents.reset(events);

      },
      error: function(jqxhr, status, error) {
        console.error('error:', error);
      }
    });

  },

  // show and hide the side view of the app
  toggleSideView: function(){
    $('.mainView').toggleClass('col-md-12 col-md-8');
    $('.sideView').toggleClass('hidden col-md-4');
  }

});
