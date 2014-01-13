app.model = app.model || {};

app.model.Milk = Backbone.Model.extend({	
	idAttribute: 'result',	
	
	initialize: function(id) {

    if (typeof id !== 'undefined' && typeof id !== 'object') {
      this.urlRoot = '/api/milks/' + id;
      return this.fetch();
    }
  }
	
});