// feeds.js
// =========
var mysql 		= require('../connections/mysql');
	
module.exports = {
	
	/*
	 * Reads
	 */
	read: {
		getAllArrivals: function(emitter, callback){
			var connection = mysql.fetchConnection(), qbuild = [], qstr, query, results = [];
			
			qbuild.push('SELECT a.arrival_id, a.source_id, s.type, a.arrival, a.temperature, a.amount, a.raw, a.price, a.haccp, a.initials, a.notes, a.created, a.updated');
			qbuild.push('FROM arrivals AS a');
			qbuild.push('JOIN sources AS s ON s.source_id = a.source_id')
			
			qstr = qbuild.join(' ');			
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
		
		getArrivalByArrivalID: function(arrival_id, callback){
		  
		  var connection = mysql.fetchConnection(), qstr, qbuild = [];
		  
		  qbuild.push('SELECT a.arrival_id, a.source_id, s.type, a.arrival, a.temperature, a.amount, a.raw, a.price, a.haccp, a.initials, a.notes, a.created, a.updated');
      qbuild.push('FROM arrivals AS a');
      qbuild.push('JOIN sources AS s ON s.source_id = a.source_id');
      qbuild.push('WHERE a.arrival_id = ?')
		  
      qstr = qbuild.join(' ');
      
		  connection.query(qstr, [arrival_id], function(err, results) {
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
		addArrival: function(params, callback){
			var connection = mysql.fetchConnection(), qstr, query;
			
			qstr = 'INSERT INTO arrivals SET ?';
			
			query = connection.query(qstr, params, function(err, result) {
	  			if(err){
	  				callback({success: false, error: err}, null);
	  			} else {
	  				callback(null, {success: true, arrival_id: result.insertId});
	  			}
			});
			
			mysql.closeConnection(connection);
		},
		
		updateArrival: function(params, callback){
		  var connection = mysql.fetchConnection(), qstr;
		  
		  qstr = 'UPDATE arrivals SET source_id = ?, arrival = ?, temperature = ?, amount = ?, raw = ?, price = ?, haccp = ?, initials = ?, notes = ?, updated = ? WHERE arrival_id = ?';
		  
		  console.log(params);
		  
		  connection.query(qstr, [params.source_id, params.arrival, params.temperature, params.amount, params.raw, params.price, params.haccp, params.initials, params.notes, params.updated, params.arrival_id], function(err, result) {		    
		    if(err){
		      callback({success:false, error: err}, null);
		    } else {
		      callback(null, {success:true});
		    }
		  });
		  
		  mysql.closeConnection(connection);
		},
		
		deleteArrivalByArrivalID: function(arrival_id, callback){
      var connection = mysql.fetchConnection(), qstr;
      
      qstr = 'DELETE FROM arrivals WHERE arrival_id = ?';
      
      connection.query(qstr, [arrival_id], function(err, result) {       
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


