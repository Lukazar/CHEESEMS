app.view = app.view || {};

app.view.Milk = Backbone.View.extend({

  template: 'milk',
  el: $('#wrapper'),
  options: {},
  model: null,

  events: {
    'click #save_milk': 'save',
    'click #update_milk': 'update',
    'click #delete_milk': 'delete',
    'click #clear_milk': 'clear'
  },

  initialize: function(options) {
    
    var that = this;
    
    this.options = options || {};
      
    async.parallel({
      milk: function(callback){
        
        if(options.id){        
          that.model = new app.model.Arrival(options.id);
          that.listenToOnce(that.model, 'change', function(resp){           
            callback(null, resp);                    
          });
        } else {
          callback(null, {attributes: {result: []}});            
        }
      },
      sources: function(callback){
        app.sources.fetch({
          reset: true
        });
        that.listenToOnce(app.sources, 'reset', function(resp){          
          callback(null, resp);          
        });
      }
    }, function (err, results){
      if(err){
        console.log(err);          
      } else {
        that.render(results);
      }
    });            
  },

  render: function(results) {

    var that = this, data = [], attr, milkObj = {};
    
    debugger;
    
    if(results.milk && !!results.milk.attributes.result.length){
      attr = results.milk.attributes.result.pop();
            
      milkObj.type = attr.type;
      milkObj.source = attr.source_id;
      milkObj.date = attr.arrival;
      milkObj.temp = attr.temperature;
      milkObj.amount = attr.amount;
      milkObj.raw = attr.raw;
      milkObj.price = attr.price;
      milkObj.haccp = attr.haccp;
      milkObj.initials = attr.initials;
      milkObj.notes = attr.notes; 
      milkObj.updated = true;
    }
    
    results.sources.each(function(source, idx) {
      var obj = {};

      if (source.attributes.type == 1) {
        
        if(milkObj.source && milkObj.source == source.attributes.source_id){
          obj.selected = true;
        } else {
          obj.selected = false;
        }
        
        obj.value = source.attributes.source_id;
        obj.key = source.attributes.name;
        data.push(obj);
      }
    });    

    // display the template
    app.getTemplate(this.template, {
      objects: data,
      data: milkObj
    }).done(function(_template) {

      if (that.options.append) {
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

  clear: function(e) {
    e.preventDefault();

    // clear the inputs
    $('input').val('');
    $("input:checkbox").prop('checked', false);
    $('select').val('select');    
    $('textarea').val('');
  },

  save: function(e) {
    e.preventDefault();

    var input = {}, model;
    
    input.type = 1;
    input.source = $('#source').val();
    input.date = $('#date').val()
    input.temperature = $('#temp').val();
    input.amount = $('#amount').val();
    input.raw = $('#raw').val();
    input.price = $('#price').val();
    input.haccp = $('#haccp').is(':checked') ? 1 : 0;
    input.initials = $('#initials').val();    
    input.notes = $('#notes').val();

    model = app.arrivals.create(input, {
      error: function(){
        
      },
      success: function() {
        
      }
    });
  },
  
  update: function(e){
    e.preventDefault();
    
    var that = this, input = {}, model;

    input.type = 1;
    input.source = $('#source').val();
    input.date = $('#date').val()
    input.temperature = $('#temp').val();
    input.amount = $('#amount').val();
    input.raw = $('#raw').val();
    input.price = $('#price').val();
    input.haccp = $('#haccp').is(':checked') ? 1 : 0;
    input.initials = $('#initials').val();    
    input.notes = $('#notes').val();

    this.model.save(input, {
      error: function() {
        //some error handling here
      },
      success: function() {
        //some event here for updating
      }
    });
    
  },
  
  delete: function(e){
    e.preventDefault();
    
    if (confirm('Are you sure you want to delete this arrival?  This operation cannot be undone')){
      this.model.destroy();
    }
  }
});
