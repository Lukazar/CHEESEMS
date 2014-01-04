app.collection = app.collection || {};

app.collection.Cultures = Backbone.Collection.extend({
	model: app.model.Culture,
	url: '/api/cultures',
	
	parse: function(resp){
		if(resp.success){			
			return resp.result;	
		} else {
			console.log('error with fetch Cultures collection');
		}
	}
})
