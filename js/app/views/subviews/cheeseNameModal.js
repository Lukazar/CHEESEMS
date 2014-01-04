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