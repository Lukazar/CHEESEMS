app.model = app.model || {};

app.model.CheeseType = Backbone.Model.extend({
	defaults:{		
		name: 'cheese name',		 
		description: ''		
	},
	idAttribute: 'result',	
});