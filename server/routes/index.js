// index.js
// =========

module.exports = function(app){
  require("./database/sources")(app);
	require("./database/milks")(app);
	require("./database/cheese_types")(app);
	require("./database/cultures")(app);
	require("./database/rennents")(app);
	require("./database/cheeses")(app);
	require("./database/batches")(app);
		
};
