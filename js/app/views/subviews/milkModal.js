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