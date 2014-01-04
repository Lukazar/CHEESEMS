// milks.js
//

var milks		= require( '../../tables/milks' ) ,
	events 		= require('events'),	   
    util		= require('../../utilities');

module.exports = function(app){
	app.post('/api/milks', function(req, resp){
		
		var params = {}, date = util.dateUtil.getMySQLFormat(new Date());	
			params.name = req.body.name;
			params.creation_datetime = date;
			params.expiration_datetime = date;
			params.description = req.body.description;									
			
		milks.write.addMilk(params, function(err, response){			
			if(err){
				console.log('addMilk error: ', err);
				resp.json(err);											
			} else {										
				if(response.success){
					//add to the queue
					params.milk_id = response.milk_id;
					
					resp.json({
						success: true, 
						result: params,
					});																																
				}
			}
		});		
	});
	
	app.get('/api/milks', function(req, resp){
		var eventEmitter = new events.EventEmitter(), result = [];
		
		eventEmitter.on('data', function(data){
			result.push(data);
		});
		
		milks.read.getAllMilksNotExpired(eventEmitter, function(err, results){
			if(err){
				console.log('getAllMilksNotExpired error: ', err);
			} else {			
				results.result = result;
				resp.json(results);				
			}
		});	
	});
};
