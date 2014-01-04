app.model = app.model || {};

app.model.Batch = Backbone.Model.extend({
	defaults:{		
		notes: '',
		milks: {},		
	},
	idAttribute: 'result',
		
	url: '/api/batches',
	initialize: function(id){
		if(typeof id !== 'undefined'){
			this.urlRoot = '/api/batches/' + id;			
			return this.fetch();
		}
	}
			
});

