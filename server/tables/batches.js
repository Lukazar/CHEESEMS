// feeds.js
// =========
var mysql 		= require('../connections/mysql');
	
module.exports = {
	
	/*
	 * Reads
	 */
	read: {
		getAllBatches: function(emitter, callback){
			var connection = mysql.fetchConnection(), qstr, query, results = [];
			
			//TODO add expiration filter			
			qstr = 'SELECT batch_id, creation_datetime, milks, notes FROM batches';			
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
		addBatch: function(params, callback){
			var connection = mysql.fetchConnection(), qstr, query;;
			
			qstr = 'INSERT INTO batches SET ?';
			
			query = connection.query(qstr, params, function(err, result) {
	  			if(err){
	  				callback({success: false, error: err}, null);
	  			} else {
	  				callback(null, {success: true, batch_id: result.insertId});
	  			}
			});
			
			mysql.closeConnection(connection);
		},
	},
};


