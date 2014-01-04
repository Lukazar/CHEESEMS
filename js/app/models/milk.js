app.model = app.model || {};

app.model.Milk = Backbone.Model.extend({
	defaults:{		
		name: 'milk name',		 
		description: ''		
	},
	idAttribute: 'result',	
});