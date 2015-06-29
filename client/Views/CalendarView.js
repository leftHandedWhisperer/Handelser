app.calendarView = Backbone.View.extend({
  el : '<div id="calendar"></div>',

  initialize: function(){
    this.collection.on('sync change reset', this.addAll, this);
    // this.collection.fetch();
  },

  render: function() {
    app.dayEvent.$el.empty();
    return this.$el;
  },

  addAll: function(){
    var that = this;
    this.$el.fullCalendar('removeEvents');
    this.$el.fullCalendar({
      header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
      timezone:'local',
      // dayClick: function(date) {
      //   console.log('dayClick shortdate: ',date.format());

      //   var dayModel = that.collection.filter(function(item) {
      //     console.log('shortdate: ',item.shortDate());
      //     return item.shortDate() === date.format();
      //   });

      //   app.dayEvent.$el.empty();
      //   for (var i=0; i<dayModel.length; i++) {
      //     app.dayEvent.$el.append((new app.dayView({model: dayModel[i]})).render());;
      //   }
      // },
      eventClick: function(event) {
        app.sideEvent = new app.dayView({model: that.collection.findWhere({name: event.title})});
        app.sidepage.render('sideEvent');
        app.filter.toggleSideView();
      }
    });
    this.collection.forEach(function(item){

      this.$el.fullCalendar('renderEvent', {
        title: item.get('name'),
        start: item.localDate()
      }, true);
    }, this)
  },

  addOne: function(event){
    var view = new app.EventView({model: event});
    this.$el.append(view.render().el);
  },

  renderDay: function(date){
    console.log('render day view')
    console.log(date)
  }

})