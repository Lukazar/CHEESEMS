app.collection = app.collection || {};

app.collection.Sources = Backbone.Collection.extend({
  model: app.model.Source,
  url: '/api/sources',
  
  parse: function(resp){
    if(resp.success){     
      return resp.result; 
    } else {
      console.log('error with fetch sources collection');
    }
  }
})
