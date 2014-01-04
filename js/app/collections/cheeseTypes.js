app.collection = app.collection || {};

app.collection.CheeseTypes = Backbone.Collection.extend({
	model: app.model.CheeseType,
	url: '/api/cheeseTypes',
	
	parse: function(resp){
		if(resp.success){			
			return resp.result;	
		} else {
			console.log('error with fetch CheeseTypes collection');
		}
	}
})
