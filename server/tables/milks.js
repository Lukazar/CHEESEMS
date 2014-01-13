// feeds.js
// =========
var mysql 		= require('../connections/mysql');
	
module.exports = {
	
	/*
	 * Reads
	 */
	read: {
		getAllMilksNotExpired: function(emitter, callback){
			var connection = mysql.fetchConnection(), qbuild = [], qstr, query, results = [];
			
			//TODO add expiration filter		
			qbuild.push('SELECT s.name, m.milk_id, m.source_id, m.arrival_id, m.amount, m.created, m.updated');
			qbuild.push('FROM milks AS m');
			qbuild.push('JOIN sources AS s ON s.source_id = m.source_id');			
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
		
		getMilkByMilkID: function(milk_id, callback){
      
      var connection = mysql.fetchConnection(), qstr, qbuild = [];
      
      qbuild.push('SELECT s.name, m.milk_id, m.source_id, m.arrival_id, m.amount, m.created, m.updated');
      qbuild.push('FROM milks AS m');
      qbuild.push('JOIN sources AS s ON s.source_id = m.source_id');
      qbuild.push('WHERE milk_id = ?');
      
      qstr = qbuild.join(' ');
      
      connection.query(qstr, [milk_id], function(err, results) {
        if(err){
          callback({success:false, error:err}, null);
        } else {
          callback(null, {success:true, result:results});
        }
      });
      
      mysql.closeConnection(connection);
		},
	},
	
	/*
	 * Writes
	 */
	write: {
		addMilk: function(params, callback){
			var connection = mysql.fetchConnection(), qstr, query;;
			
			qstr = 'INSERT INTO milks SET ?';
			
			query = connection.query(qstr, params, function(err, result) {
	  			if(err){
	  				callback({success: false, error: err}, null);
	  			} else {
	  				callback(null, {success: true, milk_id: result.insertId});
	  			}
			});
			
			mysql.closeConnection(connection);
		},
		
		deleteMilkByArrivalID: function(arrival_id, callback){
		  var connection = mysql.fetchConnection(), qstr, query;;
      
      qstr = 'DELETE FROM milks WHERE arrival_id = ?';
      
      query = connection.query(qstr, [arrival_id], function(err, result) {
          if(err){
            callback({success: false, error: err}, null);
          } else {
            callback(null, {success: true});
          }
      });
      
      mysql.closeConnection(connection);
		}
	},
};


