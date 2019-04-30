
"use strict";

//const URL = require('url').URL;

import {URL} from 'url';

module.exports = async function(req, res) { 
  let reply = require('../database/eventNext')().then(reply => {
    
    res.status(200).json({
      fulfillmentText: reply.date  + " "  + 
                       reply.time  + "\n" +  
                       reply.title + "\n" + 
                       reply.link});
    
  });
}
