app.view = app.view || {};

app.view.Menu = Backbone.View.extend({
  template: 'menu',
  row: _.template('<li id="<%= id %>" class="current"><%= name %></li>'),
  el: $('header'),

  events: {
    'click #home': 'home',
    'click #invMgmt': 'inventory',
    'click #sources': 'sources'
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    var that = this;

    // display the template
    app.getTemplate(this.template, {}).done(function(_template) {
      $(that.el).html(_template);

      // apply the button UI button style
      $('button').button();
    });
  },

  context: function(options) {

    // remove the current flag
    $('.current').removeClass('current');

    // add the breadcrumb to the trail
    $('.breadcrumbs-one').append(this.row(options));
  },

  home: function(e) {
    e.preventDefault();

    var elm = $(e.currentTarget);

    // remove breadcrumbs
    elm.nextAll('li').remove();

    app.router.inst.navigate('', {
      trigger: true
    });
  },

  inventory: function(e) {
    e.preventDefault();

    var elm = $(e.currentTarget);

    // remove breadcrumbs    
    elm.nextAll('li').remove();
    elm.remove();

    app.router.inst.navigate('inventory', {
      trigger: true
    });
  },
  
  sources: function(e){
    e.preventDefault();
    
    var elm = $(e.currentTarget);
    
    // remove breadcrumbs    
    elm.nextAll('li').remove();
    elm.remove();
    
    app.router.inst.navigate('sources', {
      trigger: true
    });
  }

});