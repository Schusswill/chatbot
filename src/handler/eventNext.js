"use strict";

const URL = require('url').URL;

module.exports = async function(req, res) { 
  let reply = require('../src/database/eventNext')().then(reply => {
    
    res.status(200).json({
      fulfillmentText: reply.date  + " "  + 
                       reply.time  + "\n" +  
                       reply.title + "\n" + 
                       reply.link});
    
  });
}