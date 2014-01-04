app.collection = app.collection || {};

app.collection.Batches = Backbone.Collection.extend({
	model: app.model.Batch,
	url: '/api/batches',
	
	parse: function(resp){
		if(resp.success){			
			return resp.result;	
		} else {
			console.log('error with fetch Batches collection');
		}
	}
})
