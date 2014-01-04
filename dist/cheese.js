/*! cheese.js - v1.0.0 - 2014-01-03
* http://lukejones.com/
* Copyright (c) 2014 Luke Jones; Licensed MIT */
var app = app || {};
app.router = app.router || {};

app.router.Router = Backbone.Router.extend({
  routes: {
    '': 'home',    
    'inventory': 'inventory',
    'sources': 'sources',
    'source': 'source',
    'source/:id': 'source',    
    'arrival': 'arrival',
    'createBatch': 'createBatch',
    'viewBatches': 'viewBatches'
  },

  home: function() {
    new app.view.Home();
  },

  inventory: function() {
    new app.view.Inventory();
    
    app.menu.context({id: 'invMgmt', name: 'Inventory Management'});
  },
  
  sources: function() {
    new app.view.Sources();
    
    app.menu.context({id: 'sources', name: 'Sources List'});
  },
  
  source: function(source_id){
    
    var name = 'Source';
    
    if(source_id){
      new app.view.Source({id:source_id});
      name = 'Edit ' + name;
    } else {
      new app.view.Source();  
      name = 'Add ' + name;
    }        
    
    app.menu.context({id: 'source', name: 'Add Source'});
  },
  
  arrival: function(){
    new app.view.Arrival();
    
    app.menu.context({id: 'arrival', name: 'Arrivals'});
  },

  createBatch: function() {
    new app.view.CreateBatch();
  },

  viewBatches: function() {
    new app.BatchListingView();
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
		if(typeof id !== 'undefined'){
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
	defaults:{		
		name: 'milk name',		 
		description: ''		
	},
	idAttribute: 'result',	
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

  initialize: function(id, callback) {

    this.callback = callback;

    if (typeof id !== 'undefined') {
      this.urlRoot = '/api/sources/' + id;
      return this.fetch();
    }
  },

  parse: function(resp) {
    if (resp.success) {
      this.callback(null, resp.result);
    } else {
      this.callback(resp.result, null);
    }
  }

});
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
  url: '/api/sources'
})

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

var app = app || {};

app.view.Cheese = Backbone.View.extend({
	
	template: 'cheese',
	rennentTmpl: 'rennentRow',
	cultureTmpl: 'cultureRow',
	tagName: 'li',
	cheeseTypeNames: [],
	rennentNames: [],
	cultureNames: [],	
	
	events:{
		'click .deleteCheese': 'deleteCheese',		
		'click .createRennent': 'createRennent',
		'click .createCulture': 'createCulture',
		'click .addRennent': 'addRennent',
		'click .addCulture': 'addCulture',
		'click .removeRennent': 'removeRennent',
		'click .removeCulture': 'removeCulture',
		//'click .addCheeseName': 'addCheeseName',
		'click .addCheeseType': 'addCheeseType',		
	},
	
	initialize: function(){								
	},
	
	render: function(options){
		
		var that = this;
		
		//display the template		
		return app.getTemplate(this.template, {}).then(function(_template){
			return $(that.el).html(_template);
		});
	},
	
	setupCheeseTypes: function(skip){
		var that = this;		
		
		if(this.cheeseTypeNames.length == 0){
			app.cheeseTypes.each(function(milk){
				that.cheeseTypeNames.push(milk.get('name'));	
			});		
		}
									
		$('.cheeseType', this.$el).autocomplete({
			source: this.cheeseTypeNames,
			select: function(e, ui){
				var model, type_id;
				model = _.find(app.cheeseTypes.models, function(type){ return type.get('name') == ui.item.value });				
				type_id = model.get('type_id');
				
				$(this).attr('data-idx', type_id);
				
			}
		});
	},
	
	setupRennents: function(skip){
		var that = this;		
		
		if(this.rennentNames.length == 0){
			app.rennents.each(function(milk){
				that.rennentNames.push(milk.get('name'));	
			});
		}	
							
		$('.cheeseRennent', this.$el).autocomplete({
			source: this.rennentNames,
			select: function(e, ui){
				var model, rennent_id;
				model = _.find(app.rennents.models, function(rennent){ return rennent.get('name') == ui.item.value });				
				rennent_id = model.get('rennent_id');
				
				$(this).attr('data-idx', rennent_id);			
			}
			
		});
	},
	
	setupCultures: function(skip){
		var that = this;
		
		if(this.cultureNames.length == 0){
			app.cultures.each(function(milk){
				that.cultureNames.push(milk.get('name'));	
			});
		}		
				
		$('.cheeseCulture', this.$el).autocomplete({
			source: this.cultureNames,
			select: function(e, ui){
				var model, culture_id;
				model = _.find(app.cultures.models, function(culture){ return culture.get('name') == ui.item.value });				
				culture_id = model.get('culture_id');
				
				$(this).attr('data-idx', culture_id);			
			}
		});
	},
	
	createRennent: function(e){
		e.preventDefault();
		
		var rennentView = new app.view.RennentModal(), that = this;
			
		$.when(rennentView.render()).then(function(data){
			
			$(data).on('saved.rennent', function(e, obj){
				$('.cheeseRennent', that.$el).val(obj.name).attr('data-idx', obj.milk_id);							
			});
			
			$('body').append(data);	
		});		
	},
	
	createCulture: function(e){
		e.preventDefault();
		
		var cultureView = new app.view.CultureModal(), that = this;
			
		$.when(cultureView.render()).then(function(data){
			
			$(data).on('saved.culture', function(e, obj){
				that.cultureNames.push(obj.name);							
				$('.cheeseCulture', that.$el).val(obj.name).attr('data-idx', obj.milk_id);
			});
			
			$('body').append(data);	
		});		
	},
	
	addCulture: function(e){
		e.preventDefault();
		
		var div = $(e.currentTarget).parents('.cheeseDrop').siblings('.cultureWrapper'), that = this;
		
		app.getTemplate(this.cultureTmpl, {}).done(function(_template){
			var elm = $(_template);
			
			$('.cheeseCulture', elm).autocomplete({
			source: that.cultureNames,
			select: function(e, ui){
				var model, culture_id;
				model = _.find(app.cultures.models, function(culture){ return culture.get('name') == ui.item.value });				
				culture_id = model.get('culture_id');
				
				$(this).attr('data-idx', culture_id);			
			}
		});
					
			div.append(elm);							
		});				
	},
	
	addRennent: function(e){
		e.preventDefault();
		
		var div = $(e.currentTarget).parents('.cheeseDrop').siblings('.rennentWrapper'), that = this;	
		
		app.getTemplate(this.rennentTmpl, {}).done(function(_template){
			var elm = $(_template);
			
			$('.cheeseRennent', elm).autocomplete({
				source: that.rennentNames,
				select: function(e, ui){
					var model, rennent_id;
					model = _.find(app.rennents.models, function(rennent){ return rennent.get('name') == ui.item.value });				
					rennent_id = model.get('rennent_id');
					
					$(this).attr('data-idx', rennent_id);			
				}
			});	
					
			div.append(elm);
				
		});		
	},
	
	removeRennent: function(e){
		e.preventDefault();
		
		var div = $(e.currentTarget).parent();
		div.remove();
	},
	
	removeCulture: function(e){
		e.preventDefault();
		
		var div = $(e.currentTarget).parent();
		div.remove();
		
	},
	
	addCheeseName: function(e){
		e.preventDefault();
		
		var cheeseNameView = new app.view.CheeseNameModal();
			
		$.when(cheeseNameView.render()).then(function(data){
			$('body').append(data);	
		});		
	},
	
	addCheeseType: function(e){
		e.preventDefault();
		
		var cheeseTypeView = new app.view.CheeseTypeModal(), that = this;
			
		$.when(cheeseTypeView.render()).then(function(data){
			
			$(data).on('saved.type', function(e, obj){
				that.cheeseTypeNames.push(obj.name);				
				$('.cheeseType', that.$el).val(obj.name).attr('data-idx', obj.milk_id);				
			});
			
			$('body').append(data);	
		});
	},
	
	deleteCheese: function(e){
		e.preventDefault();
				
		//this.model.destroy();
		this.remove();
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
    'click #invMgmt': 'inventory'
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

  inventory: function(e) {
    e.preventDefault();
    app.router.inst.navigate('inventory', {
      trigger: true
    });
  },

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
  el: $('header'),

  events: {
    'click #home': 'home',
    'click #invMgmt': 'inventory',
    'click #sources': 'sources'
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
    $('.current').removeClass('current');

    // add the breadcrumb to the trail
    $('.breadcrumbs-one').append(this.row(options));
  },

  home: function(e) {
    e.preventDefault();

    var elm = $(e.currentTarget);

    // remove breadcrumbs
    elm.nextAll('li').remove();

    app.router.inst.navigate('', {
      trigger: true
    });
  },

  inventory: function(e) {
    e.preventDefault();

    var elm = $(e.currentTarget);

    // remove breadcrumbs    
    elm.nextAll('li').remove();
    elm.remove();

    app.router.inst.navigate('inventory', {
      trigger: true
    });
  },
  
  sources: function(e){
    e.preventDefault();
    
    var elm = $(e.currentTarget);
    
    // remove breadcrumbs    
    elm.nextAll('li').remove();
    elm.remove();
    
    app.router.inst.navigate('sources', {
      trigger: true
    });
  }

});
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
    this.listenTo(app.sources, 'reset', this.render);
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