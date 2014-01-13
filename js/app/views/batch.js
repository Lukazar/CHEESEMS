app.view = app.view || {};

app.view.Batch = Backbone.View.extend({

  template: 'batch',
  row_tmpl: 'source_row',
  el: $('#wrapper'),
  $current: null,
  count: 0,
  names: [],
  lookup: {},

  events: {
    'click #add_cheese': 'add',
    'click #save_batch': 'save',
    'click .plus': 'plus'    
  },

  initialize: function() {

    // render the page
    app.milks.fetch({
      reset: true
    });
    this.listenToOnce(app.milks, 'reset', this.render);
  },

  render: function() {

    var that = this;

    // display the template
    app.getTemplate(this.template, {idx:this.count}).done(function(_template) {
      
      that.count += 1;
      
      $(that.el).html(_template);

      // apply the button UI button style
      $('button').button();
      $('#date').datetimepicker();

      app.milks.each(function(milk, idx) {        
        if(!_.contains(that.names, milk.attributes.name)){        
          that.names.push(milk.attributes.name);
          that.lookup[milk.attributes.name] = parseInt(milk.attributes.amount);
        }
      });

      that.auto();
      
      that.$el.addClass('notable');

    });
  },
  
  add: function(e){
    e.preventDefault();
    
    var that = this;        
    new app.view.Cheese();                    
  },

  plus: function(e) {
    e.preventDefault();
    
    var that = this;
    
    app.getTemplate(this.row_tmpl, {idx: this.count}).done(function(_template) {
      that.count += 1;
      
      $('#bottom').before(_template);
      that.auto();
                  
    });
  },
  
  auto: function(){
    
    var that = this, total = 0;
    
    $('.source').not('.ui-autocomplete-input').autocomplete({
      source: that.names,
      change: function(e, ui){
        var id = $(this).attr('id').split('-').pop();
        
        if($(this).val()){
          $('#volumes-' + id).val(that.lookup[ui.item.value]);
          $('#volumes-' + id).data('max', that.lookup[ui.item.value]);
        } else {
          $('#volumes-' + id).val('');
        }
        
      }
    });
  }
  
});
