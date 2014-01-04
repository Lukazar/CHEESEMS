app.view = app.view || {};

app.view.Arrival = Backbone.View.extend({

  template: 'arrival',
  milk_tmpl: 'milk',
  el: $('#wrapper'),

  events: { 
    'click #milk': 'milk',    
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
  
  milk: function(e){
    e.preventDefault();
    
    var elm = $(e.currentTarget), that = this;
    
    if(!elm.hasClass('disabled')){
      new app.view.Milk({append:true});      
      elm.addClass('disabled');      
    }    
          
  }
});
