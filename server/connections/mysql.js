var mysql 	= require('mysql');
var config  = require('../configs/dbconfig.json');

module.exports = {
	fetchConnection: function(){
		console.log('connection open');
		return mysql.createConnection(config);
	},
	
	closeConnection: function(connection){
		connection.end(function(err){
			console.log('connection closed');
		});
	}
};