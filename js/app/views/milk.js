app.view = app.view || {};

app.view.Milk = Backbone.View.extend({

  template: 'milk',
  el: $('#wrapper'),
  options: {},

  events: {
    'click #save': 'save',
    'click #clear': 'clear'
  },

  initialize: function(options) {

    this.options = options || {};
    
    // render the page    
    this.render();
  },

  render: function() {

    var that = this;

    // display the template
    app.getTemplate(this.template, {}).done(function(_template) {
      
      if(that.options.append){
        $(that.el).append(_template);
      } else {
        $(that.el).html(_template);
      }
      
      
      
      // set our tooltips
      $(document).tooltip();
      
      // set our button styles
      $('button').button();
      
      // set our datetime picker
      $('#date').datetimepicker();
      
    });
  },
  
  clear: function(e){
    e.preventDefault();
    
    //clear the inputs
    $('input').val('');
    $('select').val('select');
    $('textarea').val('');
  },
  
  save: function(e){
    e.preventDefault();
    
    var input = {}, model;
    
    input.source = $('#source').val();
    input.date = $('#date').val();
    input.temp = $('#temp').val();
    input.amount = $('#amount').val();    
    input.notes = $('#notes').val();
    
    model = app.milks.create(input, {success:function(){
      console.log(model);
    }});
  }
});
