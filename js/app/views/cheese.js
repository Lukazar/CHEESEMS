app.view = app.view || {};

app.view.Cheese = Backbone.View.extend({

  template: 'cheese',
  tagName: 'li',
  options: {},
  model: null,

  events: {
    'change .cheeseSource': 'change',
    'keyup .cheeseSource': 'change'
  },

  initialize: function() {
    
    this.max = parseInt($('#total').val());
    
    this.render();
  },

  render: function() {
    
    var that = this, data = [];
    
    $.each($('.source'), function(i,v){
      var obj = {};
      obj.idx = i;
      obj.name = $(v).val();
      data.push(obj);
    });
    
    app.getTemplate(this.template, {sources:data}).done(function(_template) {
      that.$el.html(_template);
      $('#cheeseBlock').append(that.el);
    });
  },
  
  change: function(e){
    e.preventDefault();
    
    var elm = $(e.currentTarget), input = 0, total, id = parseInt(elm.attr('id')), max = parseInt($('#volumes-' + id).data('max'));
    
    $.each($('.cheese' + id), function(i,v){
      input += parseInt($(v).val());
    });
    
    if(parseInt(input) > 0){
      
      total = max - input;  
      
      if(total < 0){
        console.log('Not enough milk');
      } else {
        $('#volumes-' + id).val(total);        
      }
      
    } else {
      console.log('Cannot have negative amount of milk')
    }    
  },

  clear: function(e) {
    
  },
  
  update: function(e){
    
  },
  
  delete: function(e){
    e.preventDefault();
    
    if (confirm('Are you sure you want to delete this cheese?  This operation cannot be undone')){
      this.model.destroy();
    }
  }
});
