app.model = app.model || {};

app.model.Source = Backbone.Model.extend({
  defaults: {},
  idAttribute: 'result',

  initialize: function(id, callback) {

    this.callback = callback;

    if (typeof id !== 'undefined') {
      this.urlRoot = '/api/sources/' + id;
      return this.fetch();
    }
  },

  parse: function(resp) {
    if (resp.success) {
      this.callback(null, resp.result);
    } else {
      this.callback(resp.result, null);
    }
  }

});