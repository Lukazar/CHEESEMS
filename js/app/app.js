(function(){
	
  Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
  }
  
	app.getDate = function(date){
		
		date = date.getUTCFullYear() + '-' +
    		('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    		('00' + date.getUTCDate()).slice(-2) + ' ' + 
    		('00' + date.getUTCHours()).slice(-2) + ':' + 
    		('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    		('00' + date.getUTCSeconds()).slice(-2);
    		
		return date;
	};
	
	app.formatDate = function(date){
	  var dformat = [date.getDate().padLeft(),
	                 (date.getMonth()+1).padLeft(),
	                 date.getFullYear()].join('/')+
	                 ' ' +
	                 [date.getHours().padLeft(),
	                  date.getMinutes().padLeft()].join(':');
	  
	  return dformat;
	}
	
	app.getTemplate = function(name, data) {
    	return $.get('js/app/templates/' + name + '.hbs').then(function(src) {
       		return Handlebars.compile(src)(data);
    	}).fail(function(e){
    		debugger; 
    		console.log(e);});
	};
	
	//TODO: async this up
	app.sources = null; //new app.collection.Sources;
	app.arrivals = null; //new app.collection.Arrivals;
	app.milks = null; //new app.collection.Milks;
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