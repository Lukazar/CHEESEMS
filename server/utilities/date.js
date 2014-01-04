// date.js
// =========
		
module.exports = {
	
	getCurrentTime: function(){
		return getDateObject().getTime();
	},
	
	getMySQLFormat: function(date){
		date = date.getUTCFullYear() + '-' +
    		('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    		('00' + date.getUTCDate()).slice(-2) + ' ' + 
    		('00' + date.getUTCHours()).slice(-2) + ':' + 
    		('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    		('00' + date.getUTCSeconds()).slice(-2);
    		
		return date;
	}	
};

function getDateObject(){
	return new Date();
}
