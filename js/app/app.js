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