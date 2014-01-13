// arrivals.js
//

var arrivals = require('../../tables/arrivals'), milks = require('../../tables/milks'), events = require('events'), util = require('../../utilities');

module.exports = function(app) {
  app.post('/api/arrivals', function(req, resp) {

    var params = {}, date = util.dateUtil.getMySQLFormat(new Date()), type = parseInt(req.body.type);
    params.source_id = parseInt(req.body.source);
    params.arrival = util.dateUtil.getMySQLFormat(new Date(req.body.date));
    params.temperature = parseInt(req.body.temperature);
    params.amount = parseInt(req.body.amount);
    params.raw = parseInt(req.body.raw);
    params.price = parseInt(req.body.price);
    params.haccp = parseInt(req.body.haccp);
    params.initials = req.body.initials;
    params.notes = req.body.notes;    
    params.created = date;
    params.updated = date;
    
    console.log(params);
    
    arrivals.write.addArrival(params, function(err, response) {
      if (err) {
        console.log('addSource error: ', err);
        resp.json(err);
      } else {
        if (response.success) {
          // add to the queue
          params.arrival_id = response.arrival_id;
          
          console.log(params);
          
          switch(type){
            case 1:
              
              var mparams = {};
              
              mparams.source_id = params.source_id;
              mparams.arrival_id = params.arrival_id;
              mparams.amount = params.amount;
              mparams.created = date;
              mparams.updated = date;
              
              console.log('milks', mparams);
              
              milks.write.addMilk(mparams, function(err, mresponse) {
                
                console.log('mresponse', mresponse);
                
                  if(err) {
                    console.log('addMilk error ', err);
                  } else {
                    if(mresponse.success){
                      resp.json({
                        success: true,
                        result: params,
                      });
                    }
                  }
              });
              break;
          }                    
        }
      }
    });
  });
  
  app.put('/api/arrivals/:arrival_id', function(req, resp){
   
    var params = {}, date = util.dateUtil.getMySQLFormat(new Date());
    params.arrival_id = parseInt(req.params.arrival_id);
    params.source_id = parseInt(req.body.source);
    params.arrival = util.dateUtil.getMySQLFormat(new Date(req.body.date));
    params.temperature = parseInt(req.body.temperature);
    params.amount = parseInt(req.body.amount);
    params.raw = parseInt(req.body.raw);
    params.price = parseInt(req.body.price);
    params.haccp = parseInt(req.body.haccp);
    params.initials = req.body.initials;
    params.notes = req.body.notes;        
    params.updated = date;
    
    arrivals.write.updateArrival(params, function(err, response){
      if(err){
        console.log('updateArrival error:', err);
      } else if(response.success) {
        resp.json(response);
      }      
    });     
  });

  app.get('/api/arrivals', function(req, resp) {
    var eventEmitter = new events.EventEmitter(), result = [];

    eventEmitter.on('data', function(data) {
      result.push(data);
    });

    arrivals.read.getAllArrivals(eventEmitter, function(err, results) {
      if (err) {
        console.log('getAllArrivals error: ', err);
      } else {
        results.result = result;
        resp.json(results);
      }
    });
  });

  app.get('/api/arrivals/:arrival_id', function(req, resp) {

    var results = {};

    arrivals.read.getArrivalByArrivalID(parseInt(req.params.arrival_id), function(
            err, result) {
      if (err) {
        console.log('getArrivalByArrivalID error: ', err);
      } else {
        resp.json(result);
      }
    });
  });
  
  app.delete('/api/arrivals/:arrival_id', function(req, resp){
    
    arrivals.write.deleteArrivalByArrivalID(parseInt(req.params.arrival_id), function(err, result){
      if(err){
        console.log('deleteArrivalByArrivalID', e);
      } else {
        
        milks.write.deleteMilkByArrivalID(parseInt(req.params.arrival_id), function(err, mresult){
          if(err){
            console.log('deleteMilkByArrivalID', e);
          } else {
            resp.json(result);
          }
        });        
      }
    });
    
  });
  
};
