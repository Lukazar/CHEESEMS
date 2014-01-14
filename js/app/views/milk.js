app.view = app.view || {};

app.view.Milk = Backbone.View.extend({

  template: 'milk',
  el: $('#wrapper'),
  success: _.template('<div><p><span class="ui-icon ui-icon-circle-check" style="float:left; margin:0 7px 50px 0;"></span><%= message %></p><div>'),
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
          
          if(app.arrivals){
            that.model = app.arrivals.get(options.id);            
            callback(null, that.model);
          } else {
            
            app.arrivals = new app.collection.Arrivals;
            app.arrivals.fetch({
              reset: true
            });
            this.listenToOnce(app.arrivals, 'reset', function(collection){
              that.model = collection.get(options.id);
              callback(null, that.model);              
            });        
          }          
        } else {
          callback(null, {attributes: {result: []}});            
        }
      },
      sources: function(callback){
        if(!app.sources){
          
          app.sources = new app.collection.Sources;
          
          app.sources.fetch({
            reset: true
          });
          that.listenToOnce(app.sources, 'reset', function(resp){          
            callback(null, resp);          
          });
        } else {
          callback(null, app.sources);
        }
        
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
    
    if(results.milk && results.milk.attributes.arrival_id){
      attr = results.milk.attributes;
            
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

    var that = this, input = {}, model, valid = true, errors = [];
    
    $.each($('.validate'), function(i,v){
      if($(v).hasClass('invalid')){        
        valid = false;
        
        if($(v).attr('id') == 'source'){
          errors.push('You must choose a source');
        } else if($(v).attr('id') == 'haccp'){
          errors.push('Please follow HACCP guidelines!');
        } else {          
          errors.push($("label[for='"+$(v).attr('name')+"']").html() + ' has invalid input');
        }
        
      } else if(v.attributes.hasOwnProperty('required') && !$(v).hasClass('valid') && $(v).val() == ""){        
        valid = false;
        
        if($(v).attr('id') == 'source'){
          errors.push('You must choose a source');
        } else if($(v).attr('id') == 'haccp'){
          errors.push('Please follow HACCP guidelines!');
        } else {          
          errors.push($("label[for='"+$(v).attr('name')+"']").html() + ' requires input');
        }
      }
    });
    
    if(valid){
    
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
        error: function(errorMsg){
          new app.view.Errors({errors: ['Error saving the model: ' + errorMsg]});
        },
        success: function() {
          $(that.success({message: 'Milk arrival has successfully been added...'})).dialog({
            title: 'Addition Successful!',
            modal: true,
            width: 470,
            show:{
              effect: 'fold',
              duration: 300
            },
            hide: {
              effect: 'fold',
              duration: 300
            },
            open: function(){
              var self = this;
              setTimeout(function(){
                $(self).dialog('close');
                $(self).remove();
              }, 1500);              
            },
            close: function(){
              app.router.inst.navigate("arrivals", {trigger: true, replace: true});
            }            
          }); 
        },
        wait: true
      });
    } else {
      new app.view.Errors({errors: errors});
    }
  },
  
  update: function(e){
    e.preventDefault();
    
    var that = this, input = {}, model, valid = true, errors = [];

    $.each($('.validate'), function(i,v){
      if($(v).hasClass('invalid')){        
        valid = false;
        
        if($(v).attr('id') == 'source'){
          errors.push('You must choose a source');
        } else if($(v).attr('id') == 'haccp'){
          errors.push('Please follow HACCP guidelines!');
        } else {          
          errors.push($("label[for='"+$(v).attr('name')+"']").html() + ' has invalid input');
        }
        
      } else if(v.attributes.hasOwnProperty('required') && !$(v).hasClass('valid') && $(v).val() == ""){
        valid = false;
        
        if($(v).attr('id') == 'source'){
          errors.push('You must choose a source');
        } else if($(v).attr('id') == 'haccp'){
          errors.push('Please follow HACCP guidelines!');
        } else {          
          errors.push($("label[for='"+$(v).attr('name')+"']").html() + ' requires input');
        }
      }
    });
    
    if(valid){
    
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
        error: function(errorMsg) {
          new app.view.Errors({errors: ['Error updating the model: ' + errorMsg]});
        },
        success: function() {
          $(that.success({message: 'Milk arrival has successfully been updated...'})).dialog({
            title: 'Update Successful!',
            modal: true,
            width: 470,
            show:{
              effect: 'fold',
              duration: 300
            },
            hide: {
              effect: 'fold',
              duration: 300
            },
            open: function(){
              var self = this;
              setTimeout(function(){
                $(self).dialog('close');
                that.$success.remove();
              }, 1500);              
            },
            close: function(){
              window.history.back();
            }
          }); 
        }
      });    
    } else {
      new app.view.Errors({errors: errors});
    }    
  },
  
  delete: function(e){
    e.preventDefault();
    
    if (confirm('Are you sure you want to delete this arrival?  This operation cannot be undone')){
      this.model.destroy();
    }
  }
});
