app.filterView = Backbone.View.extend({
  // className : 'loginout',
  el: '<div id="filterView">\
        <ul class="nav navbar-nav navbar-left"> \
          <form class="form-inline filter distance">\
            <div class="form-group">\
              <label>Search Location: </label>\
              <input type="text" class="form-control" id="location-filter">\
              <input class="btn btn-default" id="location-button" type="button" value="Update">\
            </div>\
            <div class="form-group">\
              <label>Search Radius (mi): </label>\
              <input type="number" class="form-control" id="distance-filter">\
              <input class="btn btn-default" id="filter-button" type="button" value="Update">\
            </div>\
          </form>\
        </ul> \
      <div>',

  initialize : function() {
    parseInt(this.$el.find('#distance-filter').val(50));
    this.$el.find('#location-filter').val('San Francisco, CA');
    this.renderTourmapView();
  },

  events : {
    'click #filter-button' : 'renderTourmapView',
    'click #location-button' : 'renderTourmapView'
  },

  render : function() {
    return this.$el;
  },

  renderTourmapView: function(){

    var distanceMax = parseInt(this.$el.find('#distance-filter').val());
    distanceMax = distanceMax || 50;

    var location = this.$el.find('#location-filter').val();


    $.ajax({
      type: 'GET',
      url: 'http://maps.google.com/maps/api/geocode/json?address=' + location,
      success: function(data) {
        var loc = data.results[0].geometry.location;
        console.log('user location: ', loc);

        app.tourmap.render(true,function(item) {
          return item.distanceFromLatLong(loc.lat,loc.lng) <= distanceMax;
        });

      },
      error: function(jqxhr, status, error) {
        console.error('error:', error);
      }
    });

  }
});