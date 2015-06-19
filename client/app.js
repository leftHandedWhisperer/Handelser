window.app = Backbone.View.extend({
  initialize: function(){
    console.log( 'app is running' );
    $('body').append(this.render());
  },

  render: function(){
    new app.CalendarView().render;
  }
});