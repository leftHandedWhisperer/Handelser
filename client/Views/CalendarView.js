app.CalendarView = Backbone.View.extend({
  id: 'calendar',

  initialize: function(){
    // this.collection.on('sync', this.addAll, this);
    // this.collection.fetch()
    this.render();
  },

  render: function() {
    // this.$el.empty();
    console.log('rendering cal view: ', this.$el)
    $('body').append(this.$el);
    var myCal = $('#calendar').fullCalendar({
      googleCalendarApiKey: 'AIzaSyAsftjum9vyDGNMOCUUB0864MsUR4p5kRk',
      events: {
        googleCalendarId: '5uabqkja2nt9e3mu50q5vicbgk@group.calendar.google.com'
      }
    })
    myCal.fullCalendar('renderEvent', {
      title: 'test title',
      start: '2015-06-19T13:15:30Z'
    })
  },

  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(event){
    var view = new app.EventView({model: event});
    this.$el.append(view.render().el);
  }

})