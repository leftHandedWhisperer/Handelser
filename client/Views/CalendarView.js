app.calendarView = Backbone.View.extend({
  el : '<div id="calendar"></div>',

  initialize: function(){
    this.collection.on('sync', this.addAll, this);
    this.collection.on('change', this.addAll, this);
    this.collection.fetch();
  },

  render: function() {
    return this.$el;
  },

  addAll: function(){
    this.$el.fullCalendar({})
    this.collection.forEach(function(item){
      this.$el.fullCalendar('renderEvent', {
        title: item.get('name'),
        start: item.get('date')
      }, true);
    }, this)
  },

  addOne: function(event){
    var view = new app.EventView({model: event});
    this.$el.append(view.render().el);
  }

})