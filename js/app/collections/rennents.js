app.collection = app.collection || {};

app.collection.Rennents = Backbone.Collection.extend({
	model: app.model.Rennent,
	url: '/api/rennents',
	
	parse: function(resp){
		if(resp.success){			
			return resp.result;	
		} else {
			console.log('error with fetch Rennents collection');
		}
	}
})
