app.model = app.model || {};

app.model.Cheese = Backbone.Model.extend({
	defaults:{		
		name: 'cheese name',				
		type_id: 0,
		rennents: {},
		cultures: {},
		larges: 0,
		mediums: 0,
		smalls: 0,
		batch_id: 0		
	},
		
	url: '/api/cheeses',
	initialize: function(id){
		if(typeof id !== 'undefined'){
			this.urlRoot = '/api/cheese/' + id;			
			return this.fetch();
		}
	}
			
});

