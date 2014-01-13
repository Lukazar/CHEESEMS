// feeds.js
// =========
var mysql 		= require('../connections/mysql');
	
module.exports = {
	
	/*
	 * Reads
	 */
	read: {
		getAllSources: function(emitter, callback){
			var connection = mysql.fetchConnection(), qstr, query, results = [];
								
			qstr = 'SELECT source_id, name, fullname, type, phone, email, address, notes, created FROM sources';			
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
		
		getSourceBySourceID: function(source_id, callback){
		  
		  var connection = mysql.fetchConnection(), qstr;
		  
		  qstr = 'SELECT source_id, name, fullname, type, phone, email, address, notes, created FROM sources WHERE source_id = ?';
		  
		  connection.query(qstr, [source_id], function(err, results) {
		    if(err){
		      callback({success:false, error:err}, null);
		    } else {
		      callback(null, {success:true, result:results});
		    }
		  });
		  
		  mysql.closeConnection(connection);
		}
	},
	
	/*
	 * Writes
	 */
	write: {
		addSource: function(params, callback){
			var connection = mysql.fetchConnection(), qstr, query;
			
			qstr = 'INSERT INTO sources SET ?';
			
			query = connection.query(qstr, params, function(err, result) {
	  			if(err){
	  				callback({success: false, error: err}, null);
	  			} else {
	  				callback(null, {success: true, source_id: result.insertId});
	  			}
			});
			
			mysql.closeConnection(connection);
		},
		
		updateSource: function(params, callback){
		  var connection = mysql.fetchConnection(), qstr;
		  
		  qstr = 'UPDATE sources SET name = ?, fullname = ?, type = ?, phone = ?, email = ?, address = ?, notes = ? WHERE source_id = ?';
		  
		  connection.query(qstr, [params.name, params.fullname, params.type, params.phone, params.email, params.address, params.notes, params.source_id], function(err, result) {		    
		    if(err){
		      callback({success:false, error: err}, null);
		    } else {
		      callback(null, {success:true});
		    }
		  });
		  
		  mysql.closeConnection(connection);
		},
		
		deleteSourceBySourceID: function(source_id, callback){
		  var connection = mysql.fetchConnection(), qstr;
      
      qstr = 'DELETE FROM sources WHERE source_id = ?';
      
      connection.query(qstr, [source_id], function(err, result) {       
        if(err){
          callback({success:false, error: err}, null);
        } else {
          callback(null, {success:true});
        }
      });
      
      mysql.closeConnection(connection);
		}
	},
};


