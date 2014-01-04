app.view = app.view || {};

app.view.Inventory = Backbone.View.extend({

  template: 'inventory',
  el: $('#wrapper'),

  events: {
    'click #sources': 'sources',
    'click #arrival': 'arrival'
  },

  initialize: function() {

    // render the page
    this.render();
  },

  render: function() {

    var that = this;

    // display the template
    app.getTemplate(this.template, {}).done(function(_template) {
      $(that.el).html(_template);

      // set our tooltips
      $(document).tooltip();

      // set our button styles
      $('button').button();
    });
  },

  sources: function(e) {
    e.preventDefault();

    app.router.inst.navigate('sources', {
      trigger: true
    });

  },

  arrival: function(e) {
    e.preventDefault();

    app.router.inst.navigate('arrival', {
      trigger: true
    });
  }

});
