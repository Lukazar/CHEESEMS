app.view = app.view || {};

app.view.Source = Backbone.View.extend({

  template: 'source',
  el: $('#wrapper'),
  options: {},
  source: null,

  events: {
    'click #clear': 'clear',
    'click #save': 'save',
    'click #update': 'update',
    'keyup .autotab': 'jump',
  },

  initialize: function(options) {

    this.options = options;

    // render the page
    this.render();
  },

  render: function() {

    var that = this;

    if (this.options) {
      this.source = new app.model.Source(this.options.id,
              function(err, results) {
                if (err) {
                  console.log(err);
                } else {

                  if (!!results.length) {

                    // get the object
                    var data = results.pop();

                    data.update = true;

                    switch (data.type) {
                    case 1:
                      data.milk = true;
                      break;
                    }
                    
                    if(data.phone.length == 10){ 
                      data.pstart = data.phone.substring(0,3);
                      data.pmid = data.phone.substring(3,6);
                      data.pend = data.phone.substring(6,10);
                    } else {
                      data.phone = false;
                    }

                    that.display(data);

                  } else {
                    that.display({});
                  }
                }
              });
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

    var that = this, input = {}, model;

    input.name = $('#name').val();
    input.fullname = $('#cname').val();
    input.source = parseInt($('#source').val());
    input.phone = $('#phone_start').val() + $('#phone_mid').val()
            + $('#phone_end').val();
    input.email = $('#email').val();
    input.address = $('#address').val();
    input.notes = $('#notes').val();

    model = app.sources.create(input, {
      success: function() {
        window.history.back();
      }
    });
  },
  
  update: function(e){
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
   
    this.source.save(input);
  }

});
