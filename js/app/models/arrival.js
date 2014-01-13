app.model = app.model || {};

app.model.Arrival = Backbone.Model.extend({  
  idAttribute: 'result',

  initialize: function(id) {

    if (typeof id !== 'undefined' && typeof id !== 'object') {
      this.urlRoot = '/api/arrivals/' + id;
      return this.fetch();
    }
  }
});