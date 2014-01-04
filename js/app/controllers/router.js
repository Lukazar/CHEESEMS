app.router = app.router || {};

app.router.Router = Backbone.Router.extend({
  routes: {
    '': 'home',    
    'inventory': 'inventory',
    'sources': 'sources',
    'source': 'source',
    'source/:id': 'source',    
    'arrival': 'arrival',
    'createBatch': 'createBatch',
    'viewBatches': 'viewBatches'
  },

  home: function() {
    new app.view.Home();
  },

  inventory: function() {
    new app.view.Inventory();
    
    app.menu.context({id: 'invMgmt', name: 'Inventory Management'});
  },
  
  sources: function() {
    new app.view.Sources();
    
    app.menu.context({id: 'sources', name: 'Sources List'});
  },
  
  source: function(source_id){
    
    var name = 'Source';
    
    if(source_id){
      new app.view.Source({id:source_id});
      name = 'Edit ' + name;
    } else {
      new app.view.Source();  
      name = 'Add ' + name;
    }        
    
    app.menu.context({id: 'source', name: 'Add Source'});
  },
  
  arrival: function(){
    new app.view.Arrival();
    
    app.menu.context({id: 'arrival', name: 'Arrivals'});
  },

  createBatch: function() {
    new app.view.CreateBatch();
  },

  viewBatches: function() {
    new app.BatchListingView();
  }
});