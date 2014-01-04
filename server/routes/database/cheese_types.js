// milks.js
//

var cheeseTypes		= require( '../../tables/cheese_types' ) ,
	events 		= require('events'),	   
    util		= require('../../utilities');

module.exports = function(app){
	app.post('/api/cheeseTypes', function(req, resp){
		
		var params = {}, date = util.dateUtil.getMySQLFormat(new Date());	
			params.name = req.body.name;
			params.creation_datetime = date;			
			params.description = req.body.description;									
			
		cheeseTypes.write.addCheeseType(params, function(err, response){			
			if(err){
				console.log('addCheseType error: ', err);
				resp.json(err);											
			} else {										
				if(response.success){
					//add to the queue
					params.type_id = response.milk_id;
					
					resp.json({
						success: true, 
						result: params,
					});																																
				}
			}
		});		
	});
	
	app.get('/api/cheeseTypes', function(req, resp){
		var eventEmitter = new events.EventEmitter(), result = [];
		
		eventEmitter.on('data', function(data){
			result.push(data);
		});
		
		cheeseTypes.read.getAllCheeseTypes(eventEmitter, function(err, results){
			if(err){
				console.log('getAllCheeseTypes error: ', err);
			} else {			
				results.result = result;
				resp.json(results);				
			}
		});	
	});
};
