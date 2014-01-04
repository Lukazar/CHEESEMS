// milks.js
//

var cheeses		= require( '../../tables/cheeses' ) ,
	events 		= require('events'),	   
    util		= require('../../utilities');

module.exports = function(app){
	app.post('/api/cheeses', function(req, resp){
		
		var params = {}, date = util.dateUtil.getMySQLFormat(new Date());	
			params.name = req.body.name;
			params.type_id = req.body.type_id;
			params.rennents = JSON.stringify(req.body.rennents);
			params.cultures = JSON.stringify(req.body.cultures);
			params.smalls = req.body.smalls;
			params.mediums = req.body.mediums;
			params.larges = req.body.larges;
			params.batch_id = req.body.batch_id;
			
		cheeses.write.addCheese(params, function(err, response){			
			if(err){
				console.log('addCheese error: ', err);
				resp.json(err);											
			} else {										
				if(response.success){
					//add to the queue
					params.cheese_id = response.cheese_id;
					
					resp.json({
						success: true, 
						result: params,
					});																																
				}
			}
		});		
	});
	
	app.get('/api/cheeses', function(req, resp){
		var eventEmitter = new events.EventEmitter(), result = [];
		
		eventEmitter.on('data', function(data){
			result.push(data);
		});
		
		cheeses.read.getAllCheeses(eventEmitter, function(err, results){
			if(err){
				console.log('getAllCheeses error: ', err);
			} else {			
				results.result = result;
				resp.json(results);				
			}
		});	
	});
	
	app.get('/api/cheeses/:cheese_id', function(req, resp){
		
	});
};
