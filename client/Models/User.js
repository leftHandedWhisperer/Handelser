
//logged-in users, event creators and users being followed are all represented
//as instances of the User model in the front end.
app.User = Backbone.Model.extend({
  url: '/users',

  sync: function(method, model, options) {
    if (method === 'read') {
      options.url = model.url;
    } else if (method === 'create') {
      //options.url will come in as login, signup, etc... when we invoke it
      options.url = model.url + options.url;
    }
    console.log('revised options: ',options);

    Backbone.sync(method, model, options);
  }
});