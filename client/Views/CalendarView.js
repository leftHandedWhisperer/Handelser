app.CalendarView = Backbone.View.extend({
  id: 'calendar',

  // collection: 'events',

  initialize: function(){
    // this.collection.on('sync', this.addAll, this);
    this.render()
    this.collection.on('change', this.addAll, this);
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch()
    // this.collection.on('change', this.render);
    // this.addAll();
  },

  render: function() {
    // this.$el.empty();
    console.log('rendering cal view: ', this.$el)
    $('body').append(this.$el);
    this.myCal = $('#calendar').fullCalendar({
      // googleCalendarApiKey: 'AIzaSyAsftjum9vyDGNMOCUUB0864MsUR4p5kRk',
      // events: {
      //   googleCalendarId: '5uabqkja2nt9e3mu50q5vicbgk@group.calendar.google.com'
      // }
    })
    console.log("this.collect: ", this.collection);
  },

  addAll: function(){
    console.log('in addAll function: ', this.collection)
    this.collection.forEach(function(item){
      console.log(item)
      console.log('in this collection for each', item)
      this.myCal.fullCalendar('renderEvent', {
        title: item.get('name'),
        start: item.get('date')
      })
    }, this)
    // this.render()
  },

  addOne: function(event){
    var view = new app.EventView({model: event});
    this.$el.append(view.render().el);
  }

})