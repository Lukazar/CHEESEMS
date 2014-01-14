app.model = app.model || {};

app.model.Milk = Backbone.Model.extend({	
	idAttribute: 'milk_id',	
	
	initialize: function(id) {

    if (typeof id !== 'undefined' && typeof id !== 'object') {
      this.urlRoot = '/api/milks/' + id;
      return this.fetch();
    }
  }
	
});