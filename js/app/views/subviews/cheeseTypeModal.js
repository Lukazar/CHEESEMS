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