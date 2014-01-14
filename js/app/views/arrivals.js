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
    
    if(!app.arrivals){
      app.arrivals = new app.collection.Arrivals;
      app.arrivals.fetch({
        reset: true
      });
      this.listenToOnce(app.arrivals, 'reset', this.render);
    } else {
      this.render();
    }     
  },

  render: function() {

    var that = this, columns = [], values = [];

    app.arrivals.each(function(arrival, idx) {
      var row = [];
      $.each(arrival.attributes, function(i, v) {
        
        if( i != 'source_id' && i != 'haccp' && i != 'notes' && i != 'created') {
          if (idx == 0 ) {
            columns.push({
              "sTitle": i
            });
          }
          
          if(i == 'arrival' || i == 'updated'){
            var d = new Date(v);            
            row.push(app.formatDate(d));             
          } else if( i == 'type'){
            switch(v){
              case 1:
                row.push('milk');
                break;
            }
          } else {
            row.push(v);
          }          
        }
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
    
    var arrival_id = parseInt($(e.currentTarget).find('td').eq(0).html()), type = $(e.currentTarget).find('td').eq(1).html();
    
    switch(type){
      case 'milk':
        this.milk(e, arrival_id);
        app.router.inst.navigate("milk", {trigger: false, replace: true});
        break;      
    }        
  }
});
