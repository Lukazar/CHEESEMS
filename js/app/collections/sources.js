app.collection = app.collection || {};

app.collection.Sources = Backbone.Collection.extend({
  model: app.model.Source,
  url: '/api/sources',
  
  parse: function(resp){
    
    if(resp.hasOwnProperty('success')){
      if(resp.success){     
        return resp.result; 
      } else {
        console.log('error with fetch sources collection');
      }
    } else if(resp.hasOwnProperty('attributes')){
      if(resp.attributes.success){     
        return resp.attributes.result; 
      } else {
        console.log('error with fetch sources collection');
      }
    }   
  }
})
