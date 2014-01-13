app.view = app.view || {};

app.view.Home = Backbone.View.extend({
  template: 'home',
  el: $('#wrapper'),

  events: {
    'click #invMgmt': 'inventory',
    'click #btchMgmt': 'batch',
  },

  initialize: function() {
    this.render();
    $('.breadcrumbs-two').remove();
    
  },

  render: function() {
    var that = this;

    // display the template
    app.getTemplate(this.template, {}).done(function(_template) {
      $(that.el).html(_template);

      // apply the button UI button style
      $('button').button();
      
      that.$el.removeClass('notable');
    });
  },

  inventory: function(e) {
    e.preventDefault();
    app.router.inst.navigate('inventory', {
      trigger: true
    });
  },
  
  batch: function(e){
    e.preventDefault();
    app.router.inst.navigate('batch', {
      trigger: true
    });
  }

});