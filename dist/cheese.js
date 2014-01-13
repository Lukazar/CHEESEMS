/*! cheese.js - v1.0.0 - 2014-01-12
* http://lukejones.com/
* Copyright (c) 2014 Luke Jones; Licensed MIT */
var app = app || {};
var helper = helper || {};
app.router = app.router || {};

app.router.Router = Backbone.Router.extend({
  view: null,
  routes: {
    '': 'home',
    'inventory': 'inventory',
    'sources': 'sources',
    'source': 'source',
    'source/:id': 'source',
    'arrivals': 'arrivals',
    'batch': 'batch',
    'createBatch': 'createBatch',
    'viewBatches': 'viewBatches',
    '*path': 'home'
  },

  home: function() {

    if (this.view) {
      this.destroyView();
    }

    this.view = new app.view.Home();
  },

  inventory: function() {

    if (this.view) {
      this.destroyView();
    }

    this.view = new app.view.Inventory();

    //app.menu.context({
    //  id: 'invMgmt',
    //  name: 'Inventory Management'
    //});
  },

  sources: function() {

    if (this.view) {
      this.destroyView();
    }

    this.view = new app.view.Sources();

    //app.menu.context({
    //  id: 'sourcelist',
    //  name: 'Sources List'
    //});
  },

  source: function(source_id) {

    if (this.view) {
      this.destroyView();
    }

    var name = 'Source';

    if (source_id) {
      this.view = new app.view.Source({
        id: source_id
      });
      name = 'Edit ' + name;
    } else {
      this.view = new app.view.Source();
      name = 'Add ' + name;
    }

    //app.menu.context({
    //  id: 'addsource',
    //  name: 'Add Source'
    //});
  },

  arrivals: function() {

    if (this.view) {
      this.destroyView();
    }

    this.view = new app.view.Arrivals();

    //app.menu.context({
    //  id: 'arrival',
    //  name: 'Arrivals'
    //});
  },

  batch: function() {

    if (this.view) {
      this.destroyView();
    }

    this.view = new app.view.Batch();

    //app.menu.context({
    //  id: 'batch',
    //  name: 'Batch Creation'
    //});
  },

  createBatch: function() {
    new app.view.CreateBatch();
  },

  viewBatches: function() {
    new app.BatchListingView();
  },

  destroyView: function() {

    // COMPLETELY UNBIND THE VIEW
    this.view.undelegateEvents();

    $(this.view.el).removeData().unbind();

    // Remove view from DOM
    this.view.$el.children().remove()    

    this.view = null;

  }
});
app.model = app.model || {};

app.model.Arrival = Backbone.Model.extend({  
  idAttribute: 'result',

  initialize: function(id) {

    if (typeof id !== 'undefined' && typeof id !== 'object') {
      this.urlRoot = '/api/arrivals/' + id;
      return this.fetch();
    }
  }
});
app.model = app.model || {};

app.model.Batch = Backbone.Model.extend({
	defaults:{		
		notes: '',
		milks: {},		
	},
	idAttribute: 'result',
		
	url: '/api/batches',
	initialize: function(id){
		if(typeof id !== 'undefined' && typeof id !== 'object'){
			this.urlRoot = '/api/batches/' + id;			
			return this.fetch();
		}
	}
			
});


app.model = app.model || {};

app.model.Cheese = Backbone.Model.extend({
	defaults:{		
		name: 'cheese name',				
		type_id: 0,
		rennents: {},
		cultures: {},
		larges: 0,
		mediums: 0,
		smalls: 0,
		batch_id: 0		
	},
		
	url: '/api/cheeses',
	initialize: function(id){
		if(typeof id !== 'undefined'){
			this.urlRoot = '/api/cheese/' + id;			
			return this.fetch();
		}
	}
			
});


app.model = app.model || {};

app.model.CheeseType = Backbone.Model.extend({
	defaults:{		
		name: 'cheese name',		 
		description: ''		
	},
	idAttribute: 'result',	
});
app.model = app.model || {};

app.model.Culture = Backbone.Model.extend({
	defaults:{		
		name: 'culture name',		 
		description: ''		
	}	
});
app.model = app.model || {};

app.model.Milk = Backbone.Model.extend({	
	idAttribute: 'result',	
	
	initialize: function(id) {

    if (typeof id !== 'undefined' && typeof id !== 'object') {
      this.urlRoot = '/api/milks/' + id;
      return this.fetch();
    }
  }
	
});
app.model = app.model || {};

app.model.Rennent = Backbone.Model.extend({
	defaults:{		
		name: 'rennent name',		 
		description: ''		
	}	
});
app.model = app.model || {};

app.model.Source = Backbone.Model.extend({
  defaults: {},
  idAttribute: 'result',

  initialize: function(id) {

    if (typeof id !== 'undefined' && typeof id !== 'object') {
      this.urlRoot = '/api/sources/' + id;
      return this.fetch();
    }
  }
});
app.collection = app.collection || {};

app.collection.Arrivals = Backbone.Collection.extend({
  model: app.model.Arrival,
  url: '/api/arrivals',
  
  parse: function(resp){
    if(resp.success){     
      return resp.result; 
    } else {
      console.log('error with fetch sources collection');
    }
  }
})

app.collection = app.collection || {};

app.collection.Batches = Backbone.Collection.extend({
	model: app.model.Batch,
	url: '/api/batches',
	
	parse: function(resp){
		if(resp.success){			
			return resp.result;	
		} else {
			console.log('error with fetch Batches collection');
		}
	}
})

app.collection = app.collection || {};

app.collection.CheeseTypes = Backbone.Collection.extend({
	model: app.model.CheeseType,
	url: '/api/cheeseTypes',
	
	parse: function(resp){
		if(resp.success){			
			return resp.result;	
		} else {
			console.log('error with fetch CheeseTypes collection');
		}
	}
})

app.collection = app.collection || {};

app.collection.Cheeses = Backbone.Collection.extend({
	model: app.model.Cheese,
	url: '/api/cheeses',
	
	parse: function(resp){
		if(resp.success){			
			return resp.result;	
		} else {
			console.log('error with fetch Cheeses collection');
		}
	}
})

app.collection = app.collection || {};

app.collection.Cultures = Backbone.Collection.extend({
	model: app.model.Culture,
	url: '/api/cultures',
	
	parse: function(resp){
		if(resp.success){			
			return resp.result;	
		} else {
			console.log('error with fetch Cultures collection');
		}
	}
})

app.collection = app.collection || {};

app.collection.Milks = Backbone.Collection.extend({
	model: app.model.Milk,
	url: '/api/milks',
	
	parse: function(resp){
		if(resp.success){			
			return resp.result;	
		} else {
			console.log('error with fetch Sources collection');
		}
	}
})

app.collection = app.collection || {};

app.collection.Rennents = Backbone.Collection.extend({
	model: app.model.Rennent,
	url: '/api/rennents',
	
	parse: function(resp){
		if(resp.success){			
			return resp.result;	
		} else {
			console.log('error with fetch Rennents collection');
		}
	}
})

app.collection = app.collection || {};

app.collection.Sources = Backbone.Collection.extend({
  model: app.model.Source,
  url: '/api/sources',
  
  parse: function(resp){
    if(resp.success){     
      return resp.result; 
    } else {
      console.log('error with fetch sources collection');
    }
  }
})

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

    app.arrivals.fetch({
      reset: true
    });
    this.listenToOnce(app.arrivals, 'reset', this.render);
  },

  render: function() {

    var that = this, columns = [], values = [];

    app.arrivals.each(function(arrival, idx) {
      var row = [];
      $.each(arrival.attributes, function(i, v) {
        if (idx == 0) {
          columns.push({
            "sTitle": i
          });
        }
        row.push(v);
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
    
    var arrival_id = parseInt($(e.currentTarget).find('td').eq(0).html()), type = parseInt($(e.currentTarget).find('td').eq(2).html());
    
    switch(type){
      case 1:
        this.milk(e, arrival_id);
        app.router.inst.navigate("milk", {trigger: false, replace: true});
        break;      
    }        
  }
});

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

app.BatchListingView = Backbone.View.extend({
	
	template: 'batchListing',
	el: $('#wrapper'),
	
	events:{
		'click table.display tr': 'rowClicked'
	},
	
	initialize: function(){
		
		app.batches.fetch({reset:true});		
		this.listenTo(app.batches, 'reset', this.render);	
	},
	
	render: function(){
		
		var that = this, columns = [], values = [];
		
		app.batches.each(function(batch, idx){
			var row = [];			
			$.each(batch.attributes, function(i,v){
				if(idx == 0){
					columns.push({"sTitle": i});	
				}					
				row.push(v);					
			});
			values.push(row);							
		});
		
		app.getTemplate(this.template, {}).done(function(_template){
			$(that.el).html(_template);
			
			$('#table_wrapper').dataTable({
				"bJQueryUI": true,
				"sPaginationType": "full_numbers",
				'aaData': values,
				'aoColumns': columns
			});						
		});				
	},
	
	rowClicked: function(e){
		console.log(parseInt($(e.currentTarget).find('td').eq(0).html()));
	},
	
	renderBatch: function(batch){
		var batchVatView = new app.BatchVatView({
			model: batch
		});	
		
		var el = $('.batchWrapper');
		el.append(batchVatView.render().el);
	}
	
});
app.view = app.view || {};

app.view.CreateBatch = Backbone.View.extend({
		
	template: 'createBatchTmpl',	
	$volumeAddTmpl: $('#batchVolumeAddTemplate'),
	el: $('#wrapper'),		
	sources: 1,
	cheeses: [],
	milkNames: [],
	cheeseNames: [],
	typeNames: [],
	cheeseIdx: 0,
	
	events:{
		'click #addCheese': 'addCheese',
		'click #addBatch': 'saveBatch',							
	},

	initialize: function(){
		
		this.cheeseCollection = new app.collection.Cheeses;
		//this.collection = new app.collection.Batches;
					
		//render the page				
		this.render();	
										
	},
	
	setupNames: function(){
		
		var that = this;
		
		this.names.each(function(name){
			that.cheeseNames.push(name.get('title'));	
		});								
	},
	
	setupTypes: function(){
		
		var that = this;
		
		this.types.each(function(type){
			that.typeNames.push(type.get('title'));
		})

	},		
	
	render: function(){
		
		var that = this;
				
		//display the template		
		app.getTemplate(this.template, {}).done(function(_template){
			$(that.el).html(_template);
			
			//populate the creation date
			var date = new Date();			
			var dateString = '';
						
			dateString = app.getDate(date);						
			$('#creation_date').attr('value', dateString);
			
			//load the milk component
			var milkView = new app.view.Milk();
			
			$.when(milkView.render()).then(function(data){
				//setup the sources drop down menu
				$('.batchInputs .sourcesDrop').menu();
				
				milkView.setupMilks();
				
			});
			
		});														
	},
		
	renderCheese: function(cheese){
		
		var that = this;
					
		var cheeseView = new app.view.Cheese({
			model: cheese
		});	
		
		var el = $('.batchWrapper');
		
		var cheeseViewElement = cheeseView.render({'cheeseIdx': this.cheeseIdx, 'types': this.typeNames, 'cheese': this.cheeseNames}).el;			
		el.append(cheeseViewElement);
		
		$('#large-' + this.cheeseIdx + ', #medium-' + this.cheeseIdx + ', #small-' + this.cheeseIdx).on('keyup', function(e){
			
			var uid = $(this).parent().parent().attr('data');
						
			var large = parseInt($('#large-' + uid).val()) || 0,
				medium = parseInt($('#medium-' + uid).val()) || 0,
				small = parseInt($('#small-' + uid).val()) || 0,
				total;
				
			total = large + medium + small;
			
			$('#total-' + uid).html(total);
			
		});
		
		this.cheeseIdx += 1;

	},
	
	addCheese: function(e){			
		e.preventDefault();			
		
		//load the milk component
		var cheeseView = new app.view.Cheese();
		
		$.when(cheeseView.render()).then(function(data){
			$('.batchWrapper').append(data);
			$('.cheeseDrop', data).menu();
						
			$('#large, #medium, #small', data).on('keyup', function(e){
						
				var large = parseInt($('#large', data).val()) || 0,
					medium = parseInt($('#medium', data).val()) || 0,
					small = parseInt($('#small', data).val()) || 0,
					total;
					
				total = large + medium + small;
				
				$('#total', data).html(total);
			
			});
			
			cheeseView.setupCheeseTypes();
			cheeseView.setupRennents();
			cheeseView.setupCultures();								
		});						
	},
	
	saveBatch: function(e){
		
		var that = this, model, properties = {};
		
		//get milks and vols
		properties.milks = [];
		$.each($('.autoSource'), function(idx, val){
			properties.milks.push({volume: $('.batchInputs').eq(idx).find('input').eq(0).val(), milk_id: $(val).attr('data-idx')});			
		});	
		properties.notes = $('#notes').val();
		
		model = app.batches.create(properties, {success:function(resp){
			var batch_id = model.id.batch_id;			
			that.saveCheeses(batch_id);			
		}});							
	},
	
	saveCheeses: function(batch_id){
		
		var elements = $('.batchWrapper').children(), that = this;
		
		$.each(elements, function(idx, el){
			
			var properties = {};
			
			properties.name = $(el).find('.cheeseName').val();
			properties.type_id = $(el).find('.cheeseType').attr('data-idx');
			
			properties.rennents = [];			
			$.each($('.cheeseRennent', $(el)), function(i, val){
				properties.rennents.push($(val).attr('data-idx'));	
			});
			
			properties.cultures = [];
			$.each($('.cheeseCulture', $(el)), function(i, val){
				properties.cultures.push($(val).attr('data-idx'));
			});
			
			properties.largers = $(el).find('#large').val();
			properties.mediums = $(el).find('#medium').val();
			properties.smalls = $(el).find('#small').val();
			properties.batch_id = batch_id;
			
			
			that.cheeseCollection.create(properties);
		});								
	}		
});

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

app.view = app.view || {};

app.view.Culture = Backbone.View.extend({

  template: 'culture',
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
    
    var input = {};
    
    input.source = $('#source').val();
    input.date = $('#date').val();
    input.temp = $('#temp').val();
    input.amount = $('#amount').val();    
    input.notes = $('#notes').val();
    
  }
});

app.view = app.view || {};

app.view.Home = Backbone.View.extend({
  template: 'home',
  el: $('#wrapper'),

  events: {
    'click #invMgmt': 'inventory',
    'click #btchMgmt': 'batch',
  },

  initialize: function() {
    this.render();
    $('.breadcrumbs-two').remove();
    
  },

  render: function() {
    var that = this;

    // display the template
    app.getTemplate(this.template, {}).done(function(_template) {
      $(that.el).html(_template);

      // apply the button UI button style
      $('button').button();
      
      that.$el.removeClass('notable');
    });
  },

  inventory: function(e) {
    e.preventDefault();
    app.router.inst.navigate('inventory', {
      trigger: true
    });
  },
  
  batch: function(e){
    e.preventDefault();
    app.router.inst.navigate('batch', {
      trigger: true
    });
  }

});
app.view = app.view || {};

app.view.Inventory = Backbone.View.extend({

  template: 'inventory',
  el: $('#wrapper'),

  events: {
    'click #sources': 'sources',
    'click #arrival': 'arrival'
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

  sources: function(e) {
    e.preventDefault();

    app.router.inst.navigate('sources', {
      trigger: true
    });

  },

  arrival: function(e) {
    e.preventDefault();

    app.router.inst.navigate('arrival', {
      trigger: true
    });
  }

});

app.view = app.view || {};

app.view.Menu = Backbone.View.extend({
  template: 'menu',
  row: _.template('<li id="<%= id %>" class="current"><%= name %></li>'),
  label: _.template('<div class="label"><h1><%= name %></h1></div>'),
  el: $('header'),

  events: {
    'click #home': 'home',
    'click #invMgmt': 'inventory',
    'click #batch': 'batch',
    'click #sources': 'sources',
    'click #arrivals': 'arrivals',
    'click #milk': 'milk'
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    var that = this;

    // display the template
    app.getTemplate(this.template, {}).done(function(_template) {
      $(that.el).html(_template);

      // apply the button UI button style
      $('button').button();
    });
  },

  context: function(options) {

    // remove the current flag
    //$('.current').removeClass('current');

    // add the breadcrumb to the trail
    if($('.label').length){
      $('.label').remove();
    }
    
    this.$el.append(this.label(options));        
  },

  home: function(e) {
    e.preventDefault();

    // remove secondary row
    $('.breadcrumbs-two').remove();
    $('.label').remove();

    app.router.inst.navigate('', {
      trigger: true
    });
  },

  inventory: function(e) {
    e.preventDefault();

    var that = this;

    app.getTemplate('inventory', {}).done(function(_template) {

      if ($('.breadcrumbs-two').length) {
        $('.breadcrumbs-two').html(_template);
      } else {
        that.$el.append(_template);
      }
    });

    $('.label').remove();
    app.router.inst.navigate("", {trigger: false, replace: true});
    // app.router.inst.navigate('inventory', {
    // trigger: true
    // });
  },

  batch: function(e) {
    e.preventDefault();

    // remove secondary row
    $('.breadcrumbs-two').remove();
    $('.label').remove();
    
    app.router.inst.navigate('batch', {
      trigger: true
    });
  },

  sources: function(e) {
    e.preventDefault();

    var elm = $(e.currentTarget);

    // remove breadcrumbs
    // elm.nextAll('li').remove();
    // elm.remove();

    app.router.inst.navigate('sources', {
      trigger: true
    });
    
    this.context({name: 'Sources'});
  },

  arrivals: function(e) {
    e.preventDefault();

    var that = this;

    app.getTemplate('arrivals_menu', {}).done(function(_template) {

      if ($('.breadcrumbs-two').length) {
        $('.breadcrumbs-two').html(_template);
      } else {
        that.$el.append(_template);
      }
    });

    app.router.inst.navigate('arrivals', {
      trigger: true
    });
    
    this.context({name: 'Arrivals'});
  },

  milk: function(e) {
    app.router.inst.view.milk(e);
    app.router.inst.navigate("milk", {trigger: false, replace: true});
    
    this.context({name: 'Milk'});
  }

});
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

app.view = app.view || {};

app.view.Rennent = Backbone.View.extend({

  template: 'rennent',
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
    
    var input = {};
    
    input.source = $('#source').val();
    input.date = $('#date').val();
    input.temp = $('#temp').val();
    input.amount = $('#amount').val();    
    input.notes = $('#notes').val();
    
  }
});

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

app.view = app.view || {};

app.view.Sources = Backbone.View.extend({

  template: 'sources',
  el: $('#wrapper'),

  events: {
    'click #add': 'add',
    'click table.display tr': 'edit'
  },

  initialize: function() {

    app.sources.fetch({
      reset: true
    });
    this.listenToOnce(app.sources, 'reset', this.render);
  },

  render: function() {

    var that = this, columns = [], values = [];

    app.sources.each(function(source, idx) {
      var row = [];
      $.each(source.attributes, function(i, v) {
        if (idx == 0) {
          columns.push({
            "sTitle": i
          });
        }
        row.push(v);
      });
      values.push(row);
    });

    app.getTemplate(this.template, {}).done(function(_template) {
      $(that.el).html(_template);

      $('#table_wrapper').dataTable({
        "bJQueryUI": true,
        "sPaginationType": "full_numbers",
        'aaData': values,
        'aoColumns': columns
      });
      
      // set our button styles
      $('button').button();
      
      that.$el.addClass('notable');

    });
  },

  add: function(e) {
    e.preventDefault();

    app.router.inst.navigate('source', {
      trigger: true
    });
  },
  
  edit: function(e){
    e.preventDefault();
    
    var source_id = parseInt($(e.currentTarget).find('td').eq(0).html());
    
    app.router.inst.navigate('source/' + source_id, {
      trigger: true
    });
    
  }
});
app.view = app.view || {};

app.view.CheeseNameModal = Backbone.View.extend({
	
	template: 'createCheese',
	tagName: 'div',
	className: 'modal',	
	
	events:{
		'click .saveModal': 'save',
		'click .cancelModal': 'cancel'	
	},
	
	initialize: function(){
	},
	
	render: function(){
		
		var that = this;
		
		//display the template		
		return app.getTemplate(this.template, {}).then(function(_template){
			return $(that.el).html(_template);
		});									
	},
	
	save: function(){
		
	},
	
	cancel: function(){
		this.$el.remove();
	}
	
	
});
app.view = app.view || {};

app.view.CheeseTypeModal = Backbone.View.extend({
	
	template: 'createCheeseType',
	tagName: 'div',
	className: 'modal',	
	
	events:{
		'click .saveModal': 'save',
		'click .cancelModal': 'cancel'	
	},
	
	initialize: function(){		
		_.bindAll(this, 'save', 'remove');
	},
	
	render: function(){
		
		var that = this;
		
		//display the template		
		return app.getTemplate(this.template, {}).then(function(_template){
			return $(that.el).html(_template);
		});									
	},
	
	save: function(){
		var name, desc, model, that = this;
		
		name = $('.modalName input', this.$el).val();
		desc = $('.modalDescription textarea', this.$el).val();
		
		model = app.cheeseTypes.create({name:name, description:desc}, {success:function(){
			that.$el.trigger('saved.type', {name: model.id.name});
		}});
		
		
		
		_.delay(this.remove, 1000);
	},
	
	cancel: function(){
		this.$el.remove();
	}
	
	
});
app.view = app.view || {};

app.view.CultureModal = Backbone.View.extend({
	
	template: 'createCulture',
	tagName: 'div',
	className: 'modal',	
	
	events:{
		'click .saveModal': 'save',
		'click .cancelModal': 'cancel'	
	},
	
	initialize: function(){		
	},
	
	render: function(){
		
		var that = this;
		
		//display the template		
		return app.getTemplate(this.template, {}).then(function(_template){
			return $(that.el).html(_template);
		});									
	},
	
	save: function(){
		var name, desc;
		
		name = $('.modalName input', this.$el).val();
		desc = $('.modalDescription textarea', this.$el).val();
		
		app.cultures.create({name:name, description:desc});
		
		
		
		_.delay(this.$el.remove, 1000);
	},
	
	cancel: function(){
		this.$el.remove();
	}
	
	
});
app.view = app.view || {};

app.view.MilkModal = Backbone.View.extend({
	
	template: 'createMilk',
	tagName: 'div',
	className: 'modal',	
	
	events:{
		'click .saveModal': 'save',
		'click .cancelModal': 'cancel'	
	},
	
	initialize: function(){	
		_.bindAll(this, 'save', 'remove');
	},
	
	render: function(){
		
		var that = this;
		
		//display the template		
		return app.getTemplate(this.template, {}).then(function(_template){
			return $(that.el).html(_template);
		});									
	},
	
	save: function(){
		
		var name, desc, model, that = this;
		
		name = $('.modalName input', this.$el).val();
		desc = $('.modalDescription textarea', this.$el).val();
		
		model = app.milks.create({name:name, description:desc}, {success:function(){
			that.$el.trigger('saved.milk', {name: model.id.name, milk_id: model.id.milk_id});
		}});
		
		_.delay(this.remove, 1000);
	},
	
	cancel: function(){
		this.$el.remove();
	}
	
	
});
app.view = app.view || {};

app.view.RennentModal = Backbone.View.extend({
	
	template: 'createRennent',
	tagName: 'div',
	className: 'modal',	
	
	events:{
		'click .saveModal': 'save',
		'click .cancelModal': 'cancel'	
	},
	
	initialize: function(){		
	},
	
	render: function(){
		
		var that = this;
		
		//display the template		
		return app.getTemplate(this.template, {}).then(function(_template){
			return $(that.el).html(_template);
		});									
	},
	
	save: function(){
		var name, desc;
		
		name = $('.modalName input', this.$el).val();
		desc = $('.modalDescription textarea', this.$el).val();
		
		app.rennents.create({name:name, description:desc});
		
		_.delay(this.$el.remove, 1000);
	},
	
	cancel: function(){
		this.$el.remove();
	}
	
	
});
(function(){
	
	app.getDate = function(date){
		
		date = date.getUTCFullYear() + '-' +
    		('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    		('00' + date.getUTCDate()).slice(-2) + ' ' + 
    		('00' + date.getUTCHours()).slice(-2) + ':' + 
    		('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    		('00' + date.getUTCSeconds()).slice(-2);
    		
		return date;
	};
	
	app.getTemplate = function(name, data) {
    	return $.get('js/app/templates/' + name + '.hbs').then(function(src) {
       		return Handlebars.compile(src)(data);
    	}).fail(function(e){
    		debugger; 
    		console.log(e);});
	};
	
	//TODO: async this up
	app.sources = new app.collection.Sources;
	app.arrivals = new app.collection.Arrivals;
	app.milks = new app.collection.Milks;
	//app.sources.fetch();
	
	//app.milks = new app.collection.Milks;
	//app.milks.fetch();
	
	//app.cheeseTypes = new app.collection.CheeseTypes;
	//app.cheeseTypes.fetch();
	
	//app.rennents = new app.collection.Rennents;
	//app.rennents.fetch();
	
	//app.cultures = new app.collection.Cultures;
	//app.cultures.fetch();
	
	//app.batches = new app.collection.Batches; 
	
	//control the bread crumbs
	app.menu = new app.view.Menu();
	
	app.router.inst = new app.router.Router();
	Backbone.history.start();	
})();
(function(){
  
  helper.process = function(el){
    var attr_list = {}, input = el.val();
    
    $(el[0].attributes).each(function(){
      attr_list[this.nodeName] = this.nodeValue;
    });
        
    //if required, cannot be blank
    if(attr_list.hasOwnProperty('required')){
      if(input.length == 0){
        return false;
      }
    }
    
    if(el.is('select')){
      if(el.val() === 'select'){
        return false;
      }
    } else {
    
      //if length required, make sure its that length
      if(attr_list.size){
        if(input.length != attr_list.size){
          return false;
        }
      }
      
      switch(attr_list.type){
        case 'email':
          var regex = new RegExp("^[0-9a-zA-Z]+@[0-9a-zA-Z]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+$");
          if(!regex.test(input)){
            return false;
          }
          break;
        case 'number':
        case 'phone':          
          if(!$.isNumeric(input)){
            return false;
          }
          break;
        case 'checkbox':
          if(!attr_list.hasOwnProperty('checked')){
            return false;
          }
          break;
        case 'datetime':
          break;
        case 'text':
          break;
      }
    }
    
    return true;
  };
  
  helper.listen = function(){
    var that = this;
    $('body').on('focusout', '.validate', function(e){
      if(helper.process($(this))){
        $(this).removeClass('invalid');
        $(this).addClass('valid');
      } else {
        $(this).removeClass('valid');
        $(this).addClass('invalid');
      }
    });
    
    $('#wrapper').on('focusin', '.validate', function(e){
      $(this).removeClass('valid');
      $(this).removeClass('invalid');
    });
  }
  
  helper.listen();
  
})();