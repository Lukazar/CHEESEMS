// milks.js
//

var batches		= require( '../../tables/batches' ) ,
	events 		= require('events'),	   
    util		= require('../../utilities');

module.exports = function(app){
	app.post('/api/batches', function(req, resp){
		
		var params = {}, date = util.dateUtil.getMySQLFormat(new Date());
			params.creation_datetime = date;							
			params.milks = JSON.stringify(req.body.milks);
			params.notes = req.body.notes;
						
		batches.write.addBatch(params, function(err, response){			
			if(err){
				console.log('addCheese error: ', err);
				resp.json(err);											
			} else {										
				if(response.success){
					//add to the queue
					params.batch_id = response.batch_id;
					
					resp.json({
						success: true, 
						result: params,
					});																																
				}
			}
		});		
	});
	
	app.get('/api/batches', function(req, resp){
		var eventEmitter = new events.EventEmitter(), result = [];
		
		eventEmitter.on('data', function(data){
			result.push(data);
		});
		
		batches.read.getAllBatches(eventEmitter, function(err, results){
			if(err){
				console.log('getAllBatches error: ', err);
			} else {			
				results.result = result;
				resp.json(results);				
			}
		});	
	});
	
	app.get('/api/batches/:batch_id', function(req, resp){
		
	});
};
