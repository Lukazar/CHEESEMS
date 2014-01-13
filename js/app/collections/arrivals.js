app.collection = app.collection || {};

app.collection.Arrivals = Backbone.Collection.extend({
  model: app.model.Arrival,
  url: '/api/arrivals',
  
  parse: function(resp){
    if(resp.success){     
      return resp.result; 
    } else {
      console.log('error with fetch sources collection');
    }
  }
})
