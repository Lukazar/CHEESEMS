// milks.js
//

var cultures		= require( '../../tables/cultures' ) ,
	events 		= require('events'),	   
    util		= require('../../utilities');

module.exports = function(app){
	app.post('/api/cultures', function(req, resp){
		
		var params = {}, date = util.dateUtil.getMySQLFormat(new Date());	
			params.name = req.body.name;
			params.creation_datetime = date;
			params.expiration_datetime = date;
			params.description = req.body.description;									
			
		cultures.write.addCulture(params, function(err, response){			
			if(err){
				console.log('addCulture error: ', err);
				resp.json(err);											
			} else {										
				if(response.success){
					//add to the queue
					params.culture_id = response.culture_id;
					
					resp.json({
						success: true, 
						result: params,
					});																																
				}
			}
		});		
	});
	
	app.get('/api/cultures', function(req, resp){
		var eventEmitter = new events.EventEmitter(), result = [];
		
		eventEmitter.on('data', function(data){
			result.push(data);
		});
		
		cultures.read.getAllCulturesNotExpired(eventEmitter, function(err, results){
			if(err){
				console.log('getAllCulturesNotExpired error: ', err);
			} else {			
				results.result = result;
				resp.json(results);				
			}
		});	
	});
};
