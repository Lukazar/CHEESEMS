app.model = app.model || {};

app.model.Arrival = Backbone.Model.extend({  
  idAttribute: 'arrival_id',

  initialize: function(id) {

    if (typeof id !== 'undefined' && typeof id !== 'object') {
      this.urlRoot = '/api/arrivals/' + id;
      return this.fetch();
    }
  }
});