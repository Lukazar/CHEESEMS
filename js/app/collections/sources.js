app.collection = app.collection || {};

app.collection.Sources = Backbone.Collection.extend({
  model: app.model.Source,
  url: '/api/sources'
})
