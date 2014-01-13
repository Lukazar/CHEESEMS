app.model = app.model || {};

app.model.Source = Backbone.Model.extend({
  defaults: {},
  idAttribute: 'result',

  initialize: function(id) {

    if (typeof id !== 'undefined' && typeof id !== 'object') {
      this.urlRoot = '/api/sources/' + id;
      return this.fetch();
    }
  }
});