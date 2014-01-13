app.view = app.view || {};

app.view.Arrivals = Backbone.View.extend({

  template: 'arrivals',
  milk_tmpl: 'milk',
  el: $('#wrapper'),

  events: { 
    'click #milk': 'milk',  
    'click table.display tr': 'edit'
  },

  initialize: function() {

    app.arrivals.fetch({
      reset: true
    });
    this.listenToOnce(app.arrivals, 'reset', this.render);
  },

  render: function() {

    var that = this, columns = [], values = [];

    app.arrivals.each(function(arrival, idx) {
      var row = [];
      $.each(arrival.attributes, function(i, v) {
        if (idx == 0) {
          columns.push({
            "sTitle": i
          });
        }
        row.push(v);
      });
      values.push(row);
    });

    // display the template
    app.getTemplate(this.template, {}).done(function(_template) {
      $(that.el).html(_template);

      $('#table_wrapper').dataTable({
        "bJQueryUI": true,
        "sPaginationType": "full_numbers",
        'aaData': values,
        'aoColumns': columns
      });
      
      // set our tooltips
      $(document).tooltip();

      // set our button styles
      $('button').button();    
      
      that.$el.addClass('notable');
    });
  },
  
  milk: function(e, arrival_id){
    e.preventDefault();
    
    var elm = $(e.currentTarget), that = this;
    
    if(!elm.hasClass('disabled')){
      
      var options = {}
      options.append = false;
      if(arrival_id){
        options.id = arrival_id;
      }
      
      new app.view.Milk(options);      
      elm.addClass('disabled');      
    }    
          
  },
  
  edit: function(e){
    e.preventDefault();
    
    var arrival_id = parseInt($(e.currentTarget).find('td').eq(0).html()), type = parseInt($(e.currentTarget).find('td').eq(2).html());
    
    switch(type){
      case 1:
        this.milk(e, arrival_id);
        app.router.inst.navigate("milk", {trigger: false, replace: true});
        break;      
    }        
  }
});
