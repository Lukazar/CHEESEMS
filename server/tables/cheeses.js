// feeds.js
// =========
var mysql 		= require('../connections/mysql');
	
module.exports = {
	
	/*
	 * Reads
	 */
	read: {
		getAllCheeses: function(emitter, callback){
			var connection = mysql.fetchConnection(), qstr, query, results = [];
			
			//TODO add expiration filter			
			qstr = 'SELECT cheese_id, name, type_id, rennents, cultures, smalls, mediums, larges, batch_id FROM cheeses';			
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
		addCheese: function(params, callback){
			var connection = mysql.fetchConnection(), qstr, query;;
			
			qstr = 'INSERT INTO cheeses SET ?';
			
			query = connection.query(qstr, params, function(err, result) {
	  			if(err){
	  				callback({success: false, error: err}, null);
	  			} else {
	  				callback(null, {success: true, cheese_id: result.insertId});
	  			}
			});
			
			mysql.closeConnection(connection);
		},
	},
};


