// sources.js
//

var sources = require('../../tables/sources'), events = require('events'), util = require('../../utilities');

module.exports = function(app) {
  app.post('/api/sources', function(req, resp) {

    var params = {}, date = util.dateUtil.getMySQLFormat(new Date());
    params.name = req.body.name;
    params.fullname = req.body.fullname;
    params.type = req.body.source;
    params.phone = req.body.phone;
    params.address = req.body.address;
    params.email = req.body.email;
    params.notes = req.body.notes;    
    params.created = date;

    sources.write.addSource(params, function(err, response) {
      if (err) {
        console.log('addSource error: ', err);
        resp.json(err);
      } else {
        if (response.success) {
          // add to the queue
          params.source_id = response.source_id;
          
          // need to redorder the attributes for backbone implicit model sync
          var ordered = {};
          ordered.source_id = params.source_id;
          ordered.name = params.name;
          ordered.fullname = params.fullname;
          ordered.type = params.type;
          ordered.phone = params.phone;
          ordered.email = params.email;          
          ordered.address = params.address;
          ordered.notes = params.notes;
          ordered.created = params.created;
          
          resp.json({
            success: true,
            result: ordered,
          });
        }
      }
    });
  });
  
  app.put('/api/sources/:source_id', function(req, resp){
   
    var params = {};
    params.source_id = parseInt(req.params.source_id);
    params.name = req.body.name;
    params.fullname = req.body.fullname;
    params.type = req.body.source;
    params.address = req.body.address;
    params.phone = req.body.phone;
    params.email = req.body.email;
    params.notes = req.body.notes;
    
    sources.write.updateSource(params, function(err, response){
      if(err){
        console.log('updateSource error:', err);
      } else if(response.success) {
        resp.json(response);
      }      
    });     
  });

  app.get('/api/sources', function(req, resp) {
    var eventEmitter = new events.EventEmitter(), result = [];

    eventEmitter.on('data', function(data) {
      result.push(data);
    });

    sources.read.getAllSources(eventEmitter, function(err, results) {
      if (err) {
        console.log('getAllSources error: ', err);
      } else {
        results.result = result;
        resp.json(results);
      }
    });
  });

  app.get('/api/sources/:source_id', function(req, resp) {

    var results = {};

    sources.read.getSourceBySourceID(parseInt(req.params.source_id), function(
            err, result) {
      if (err) {
        console.log('getSourceBySourceID error: ', err);
      } else {
        resp.json(result);
      }
    });
  });
  
  app.delete('/api/sources/:source_id', function(req, resp){
    
    sources.write.deleteSourceBySourceID(parseInt(req.params.source_id), function(err, result){
      if(err){
        console.log('deleteSourceBySourceID', e);
      } else {
        resp.json(result);
      }
    });
    
  });
};
