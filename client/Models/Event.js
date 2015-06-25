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
  }
});