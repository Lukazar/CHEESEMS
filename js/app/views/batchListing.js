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