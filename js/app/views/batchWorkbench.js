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
