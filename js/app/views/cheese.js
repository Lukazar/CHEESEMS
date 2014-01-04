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
