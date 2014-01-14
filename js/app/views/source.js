app.view = app.view || {};

app.view.Source = Backbone.View.extend({

  template: 'source',
  el: $('#wrapper'),
  success: _.template('<div><p><span class="ui-icon ui-icon-circle-check" style="float:left; margin:0 7px 50px 0;"></span><%= message %></p><div>'),
  options: {},
  source: null,
  model: null,

  events: {
    'click #clear': 'clear',
    'click #save': 'save',
    'click #delete': 'delete',
    'click #update': 'update',
    'keyup .autotab': 'jump',
  },

  initialize: function(options) {
    
    var that = this;
    
    this.options = options || {};
    
    if(this.options.id){
      
      if(app.sources){
        this.model = app.sources.get(options.id);
        this.render(this.model);
      } else {
        
        app.sources = new app.collection.Sources;
        app.sources.fetch({
          reset: true
        });
        this.listenToOnce(app.sources, 'reset', function(collection){
          that.model = collection.get(options.id);
          that.render(that.model);
        });        
      }      
    } else {
      this.render({attributes:{result:[]}});      
    }
  },

  render: function(resp) {

    var that = this, attr = resp.attributes;

    if (attr.source_id) {

      // get the object
      var data = attr;

      data.update = true;

      switch (data.type) {
      case 1:
        data.milk = true;
        break;
      }

      if (data.phone.length == 10) {
        data.pstart = data.phone.substring(0, 3);
        data.pmid = data.phone.substring(3, 6);
        data.pend = data.phone.substring(6, 10);
      } else {
        data.phone = false;
      }

      that.display(data);

    } else {
      this.display({});
    }
  },

  display: function(data) {

    var that = this;

    // display the template
    app.getTemplate(this.template, data).done(function(_template) {
      $(that.el).html(_template);

      // set our tooltips
      $(document).tooltip();

      // set our button styles
      $('button').button();
    });
  },

  jump: function(e) {
    e.preventDefault();

    var elm = $(e.currentTarget), target = elm.attr('maxlength'), length = elm
            .val().length;

    if (length >= target) {
      elm.next().focus();
    }

  },

  clear: function(e) {
    e.preventDefault();

    // clear the inputs
    $('input').val('');
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
        } else if($(v).attr('id').indexOf('phone') !== -1){
          errors.push('Invalid characters in the phone number');
        } else {          
          errors.push($("label[for='"+$(v).attr('name')+"']").html() + ' has invalid input');
        }
      } else if(v.attributes.hasOwnProperty('required') && !$(v).hasClass('valid') && $(v).val() == ""){
        valid = false;
        
        if($(v).attr('id') == 'source'){
          errors.push('You must choose a source');
        } else if($(v).attr('id').indexOf('phone') !== -1){
          errors.push('Phone number requires input');
        } else {
          errors.push($("label[for='"+$(v).attr('name')+"']").html() + ' requires input');
        }        
      }
    });
    
    if(valid){    
      input.name = $('#name').val();
      input.fullname = $('#cname').val();
      input.source = $('#source').val();
      input.phone = $('#phone_start').val() + $('#phone_mid').val()
              + $('#phone_end').val();
      input.email = $('#email').val();
      input.address = $('#address').val();
      input.notes = $('#notes').val();
  
      model = app.sources.create(input, {
        error: function(errorMsg){
          new app.view.Errors({errors: ['Error saving the model: ' + errorMsg]});
        },
        success: function() {
          $(that.success({message: 'Source has successfully been added...'})).dialog({
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
              window.history.back();
            }
          });          
        },
        wait: true
      });      
    } else {
      new app.view.Errors({errors: errors});
    }
  },

  update: function(e) {
    e.preventDefault();

    var that = this, input = {}, model, valid = true, errors = [];
    
    $.each($('.validate'), function(i,v){
      if($(v).hasClass('invalid')){        
        valid = false;
        
        if($(v).attr('id') == 'source'){
          errors.push('You must choose a source');
        } else if($(v).attr('id').indexOf('phone') !== -1){
          errors.push('Invalid characters in the phone number');
        } else {
          errors.push($("label[for='"+$(v).attr('name')+"']").html() + ' has invalid input');
        }        
      } else if(v.attributes.hasOwnProperty('required') && !$(v).hasClass('valid') && $(v).val() == ""){
        valid = false;
        
        if($(v).attr('id') == 'source'){
          errors.push('You must choose a source');
        } else if($(v).attr('id').indexOf('phone') !== -1){
          errors.push('Phone number requires input');
        } else {
          errors.push($("label[for='"+$(v).attr('name')+"']").html() + ' requires input');
        }        
      }
    });
    
    if(valid){
      input.name = $('#name').val();
      input.fullname = $('#cname').val();
      input.source = parseInt($('#source').val());
      input.phone = $('#phone_start').val() + $('#phone_mid').val()
              + $('#phone_end').val();
      input.email = $('#email').val();
      input.address = $('#address').val();
      input.notes = $('#notes').val();
  
      this.model.save(input, {
        error: function() {
          new app.view.Errors({errors: ['Error updating the model: ' + errorMsg]});
        },
        success: function() {
          $(that.success({message: 'Source has successfully been updated...'})).dialog({
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
    
    if (confirm('Are you sure you want to delete this source?  This operation cannot be undone')){
      this.model.destroy();
      window.history.back();
    }
    
  }

});
