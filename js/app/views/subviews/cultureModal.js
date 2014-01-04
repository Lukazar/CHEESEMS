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