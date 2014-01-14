app.view = app.view || {};

app.view.Menu = Backbone.View.extend({
  template: 'menu',
  row: _.template('<li id="<%= id %>" class="current"><%= name %></li>'),
  label: _.template('<div class="label"><h1><%= name %></h1></div>'),
  el: $('header'),

  events: {
    'click #home': 'home',
    'click #invMgmt': 'inventory',
    'click #batch': 'batch',
    'click #sources': 'sources',
    'click #arrivals': 'arrivals',
    'click #milk': 'milk'
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
    //$('.current').removeClass('current');

    // add the breadcrumb to the trail
    if($('.label').length){
      $('.label').remove();
    }
    
    this.$el.append(this.label(options));        
  },

  home: function(e) {
    e.preventDefault();

    // remove secondary row
    $('.breadcrumbs-two').remove();
    $('.label').remove();

    app.router.inst.navigate('', {
      trigger: true
    });
  },

  inventory: function(e) {
    e.preventDefault();

    var that = this;

    app.getTemplate('inventory', {}).done(function(_template) {

      if ($('.breadcrumbs-two').length) {
        $('.breadcrumbs-two').html(_template);
      } else {
        that.$el.append(_template);
      }
    });

    $('.label').remove();
    app.router.inst.navigate("", {trigger: true, replace: true});
    // app.router.inst.navigate('inventory', {
    // trigger: true
    // });
  },

  batch: function(e) {
    e.preventDefault();

    // remove secondary row
    $('.breadcrumbs-two').remove();
    $('.label').remove();
    
    app.router.inst.navigate('batch', {
      trigger: true
    });
  },

  sources: function(e) {
    e.preventDefault();

    var elm = $(e.currentTarget);

    // remove breadcrumbs
    // elm.nextAll('li').remove();
    // elm.remove();

    app.router.inst.navigate('sources', {
      trigger: true
    });
    
    this.context({name: 'Sources'});
  },

  arrivals: function(e) {
    e.preventDefault();

    var that = this;

    app.getTemplate('arrivals_menu', {}).done(function(_template) {

      if ($('.breadcrumbs-two').length) {
        $('.breadcrumbs-two').html(_template);
      } else {
        that.$el.append(_template);
      }
    });

    app.router.inst.navigate('arrivals', {
      trigger: true
    });
    
    this.context({name: 'Arrivals'});
  },

  milk: function(e) {
    app.router.inst.view.milk(e);
    app.router.inst.navigate("milk", {trigger: false, replace: true});
    
    this.context({name: 'Milk'});
  }

});