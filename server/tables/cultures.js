// feeds.js
// =========
var mysql 		= require('../connections/mysql');
	
module.exports = {
	
	/*
	 * Reads
	 */
	read: {
		getAllCulturesNotExpired: function(emitter, callback){
			var connection = mysql.fetchConnection(), qstr, query, results = [];
			
			//TODO add expiration filter			
			qstr = 'SELECT culture_id, name, creation_datetime, expiration_datetime, description FROM cultures';			
			query = connection.query(qstr);	
			
			query.on('error', function(err){					
				callback({success: false, error: err}, null);			
			}).on('fields', function(fields){			
			}).on('result', function(row){
								
				emitter.emit('data', row);																
								
			}).on('end', function(){												
				callback(null, {success: true});						
			});
			
			mysql.closeConnection(connection);				
		},	
	},
	
	/*
	 * Writes
	 */
	write: {
		addCulture: function(params, callback){
			var connection = mysql.fetchConnection(), qstr, query;;
			
			qstr = 'INSERT INTO cultures SET ?';
			
			query = connection.query(qstr, params, function(err, result) {
	  			if(err){
	  				callback({success: false, error: err}, null);
	  			} else {
	  				callback(null, {success: true, culture_id: result.insertId});
	  			}
			});
			
			mysql.closeConnection(connection);
		},
	},
};


