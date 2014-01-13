app.view = app.view || {};

app.view.Source = Backbone.View.extend({

  template: 'source',
  el: $('#wrapper'),
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

    this.options = options || {};
    
    if(this.options.id){
      this.model = new app.model.Source(options.id);
      this.listenToOnce(this.model, 'change', this.render);
    } else {
      this.render({attributes:{result:[]}});      
    }
  },

  render: function(resp) {

    var that = this, attr = resp.attributes;

    if (!!attr.result.length) {

      // get the object
      var data = attr.result.pop();

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

    var that = this, input = {}, model, valid = true;

    $.each($('.validate'), function(i,v){
      if($(v).hasClass('invalid')){        
        valid = false;
        return false;
      }
      
      if(v.attributes.hasOwnProperty('required') && !$(v).hasClass('valid') && $(v).val() == ""){
        valid = false;
        return false;
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
        error: function(){
          //some event here for error
        },
        success: function() {
          //some event here for save
        }
      });    
    } else {
      console.log('Errors in input');
    }
  },

  update: function(e) {
    e.preventDefault();

    var that = this, input = {}, model;

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
        //some error handling here
      },
      success: function() {
        //some event here for updating
      }
    });
  },
  
  delete: function(e){
    e.preventDefault();
    
    if (confirm('Are you sure you want to delete this source?  This operation cannot be undone')){
      this.model.destroy();
    }
    
  }

});
