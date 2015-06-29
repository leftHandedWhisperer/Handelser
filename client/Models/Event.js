Number.prototype.toRadians = function() {
   return this * Math.PI / 180;
}

app.Event = Backbone.Model.extend({
  url: '/events',
  shortDate: function() {
    var longDate = this.localDate();
    var shortyDate = longDate.slice(0,10);
    // console.log('short date: ',shortyDate);
    return shortyDate;
  },
  localDate: function() {
    var localoffset = (new Date()).getTimezoneOffset();
    var offset = - localoffset/60;

    var isoDate = new Date(this.get('date'));
    var localDate = new Date(isoDate.setHours(isoDate.getHours()+offset));
    // console.log('localDate: ',localDate);
    var dateForCal = localDate.toISOString();
    return dateForCal;
  },
  distanceFromLatLong: function(lat, long) {
      var eventLat = this.get('lat');
      var eventLong = this.get('long');

      var lat1 = lat;
      var lat2 = eventLat;

      var lon1 = long;
      var lon2 = eventLong;

      var R = 6371000; // metres
      var φ1 = lat1.toRadians();
      var φ2 = lat2.toRadians();
      var Δφ = (lat2-lat1).toRadians();
      var Δλ = (lon2-lon1).toRadians();

      var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      var d = R * c;

      var miles = d * 0.62137 / 1000; //m to mi
      return miles;
    }
});