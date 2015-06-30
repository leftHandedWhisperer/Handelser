app.dayEventView = Backbone.View.extend({ //a really unnecessary wrapper for dayView
  el : '\
    <div class="dayEventView"></div>\
  ',

  initialize : function() {
  },

  render : function() {
    return this.$el;
  }
});
