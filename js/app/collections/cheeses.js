app.collection = app.collection || {};

app.collection.Cheeses = Backbone.Collection.extend({
	model: app.model.Cheese,
	url: '/api/cheeses',
	
	parse: function(resp){
		if(resp.success){			
			return resp.result;	
		} else {
			console.log('error with fetch Cheeses collection');
		}
	}
})
