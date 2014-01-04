app.collection = app.collection || {};

app.collection.Milks = Backbone.Collection.extend({
	model: app.model.Milk,
	url: '/api/milks',
	
	parse: function(resp){
		if(resp.success){			
			return resp.result;	
		} else {
			console.log('error with fetch Sources collection');
		}
	}
})
