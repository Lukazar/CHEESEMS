app.collection = app.collection || {};

app.collection.Arrivals = Backbone.Collection.extend({
  model: app.model.Arrival,
  url: '/api/arrivals',
  
  parse: function(resp){
    
    if(resp.hasOwnProperty('success')){
      if(resp.success){     
        return resp.result; 
      } else {
        console.log('error with fetch arrivals collection');
      }
    } else if(resp.hasOwnProperty('attributes')){
      if(resp.attributes.success){     
        return resp.attributes.result; 
      } else {
        console.log('error with fetch arrivals collection');
      }
    }    
  }
})
