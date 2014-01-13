app.view = app.view || {};

app.view.Sources = Backbone.View.extend({

  template: 'sources',
  el: $('#wrapper'),

  events: {
    'click #add': 'add',
    'click table.display tr': 'edit'
  },

  initialize: function() {

    app.sources.fetch({
      reset: true
    });
    this.listenToOnce(app.sources, 'reset', this.render);
  },

  render: function() {

    var that = this, columns = [], values = [];

    app.sources.each(function(source, idx) {
      var row = [];
      $.each(source.attributes, function(i, v) {
        if (idx == 0) {
          columns.push({
            "sTitle": i
          });
        }
        row.push(v);
      });
      values.push(row);
    });

    app.getTemplate(this.template, {}).done(function(_template) {
      $(that.el).html(_template);

      $('#table_wrapper').dataTable({
        "bJQueryUI": true,
        "sPaginationType": "full_numbers",
        'aaData': values,
        'aoColumns': columns
      });
      
      // set our button styles
      $('button').button();
      
      that.$el.addClass('notable');

    });
  },

  add: function(e) {
    e.preventDefault();

    app.router.inst.navigate('source', {
      trigger: true
    });
  },
  
  edit: function(e){
    e.preventDefault();
    
    var source_id = parseInt($(e.currentTarget).find('td').eq(0).html());
    
    app.router.inst.navigate('source/' + source_id, {
      trigger: true
    });
    
  }
});