// milks.js
//

var rennents		= require( '../../tables/rennents' ) ,
	events 		= require('events'),	   
    util		= require('../../utilities');

module.exports = function(app){
	app.post('/api/rennents', function(req, resp){
		
		var params = {}, date = util.dateUtil.getMySQLFormat(new Date());	
			params.name = req.body.name;
			params.creation_datetime = date;
			params.expiration_datetime = date;
			params.description = req.body.description;									
			
		rennents.write.addRennent(params, function(err, response){			
			if(err){
				console.log('addRennent error: ', err);
				resp.json(err);											
			} else {										
				if(response.success){
					//add to the queue
					params.rennent_id = response.rennent_id;
					
					resp.json({
						success: true, 
						result: params,
					});																																
				}
			}
		});		
	});
	
	app.get('/api/rennents', function(req, resp){
		var eventEmitter = new events.EventEmitter(), result = [];
		
		eventEmitter.on('data', function(data){
			result.push(data);
		});
		
		rennents.read.getAllRennentsNotExpired(eventEmitter, function(err, results){
			if(err){
				console.log('getAllRennentsNotExpired error: ', err);
			} else {			
				results.result = result;
				resp.json(results);				
			}
		});	
	});
};
