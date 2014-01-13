app.router = app.router || {};

app.router.Router = Backbone.Router.extend({
  view: null,
  routes: {
    '': 'home',
    'inventory': 'inventory',
    'sources': 'sources',
    'source': 'source',
    'source/:id': 'source',
    'arrivals': 'arrivals',
    'batch': 'batch',
    'createBatch': 'createBatch',
    'viewBatches': 'viewBatches',
    '*path': 'home'
  },

  home: function() {

    if (this.view) {
      this.destroyView();
    }

    this.view = new app.view.Home();
  },

  inventory: function() {

    if (this.view) {
      this.destroyView();
    }

    this.view = new app.view.Inventory();

    //app.menu.context({
    //  id: 'invMgmt',
    //  name: 'Inventory Management'
    //});
  },

  sources: function() {

    if (this.view) {
      this.destroyView();
    }

    this.view = new app.view.Sources();

    //app.menu.context({
    //  id: 'sourcelist',
    //  name: 'Sources List'
    //});
  },

  source: function(source_id) {

    if (this.view) {
      this.destroyView();
    }

    var name = 'Source';

    if (source_id) {
      this.view = new app.view.Source({
        id: source_id
      });
      name = 'Edit ' + name;
    } else {
      this.view = new app.view.Source();
      name = 'Add ' + name;
    }

    //app.menu.context({
    //  id: 'addsource',
    //  name: 'Add Source'
    //});
  },

  arrivals: function() {

    if (this.view) {
      this.destroyView();
    }

    this.view = new app.view.Arrivals();

    //app.menu.context({
    //  id: 'arrival',
    //  name: 'Arrivals'
    //});
  },

  batch: function() {

    if (this.view) {
      this.destroyView();
    }

    this.view = new app.view.Batch();

    //app.menu.context({
    //  id: 'batch',
    //  name: 'Batch Creation'
    //});
  },

  createBatch: function() {
    new app.view.CreateBatch();
  },

  viewBatches: function() {
    new app.BatchListingView();
  },

  destroyView: function() {

    // COMPLETELY UNBIND THE VIEW
    this.view.undelegateEvents();

    $(this.view.el).removeData().unbind();

    // Remove view from DOM
    this.view.$el.children().remove()    

    this.view = null;

  }
});