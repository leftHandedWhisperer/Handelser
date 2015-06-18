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
    $('#calendar').fullCalendar({})
  },

  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(event){
    var view = new app.EventView({model: event});
    this.$el.append(view.render().el);
  }

})