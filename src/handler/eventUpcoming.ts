
"use strict";

import {URL} from 'url';

module.exports = async function(req, res) { 
  let userContexts = req.body.queryResult.outputContexts;
  
  let contextNames = userContexts.map(context => {
    context.name = context.name.split("/");
    return context.name[context.name.length-1];
  });
  
  let timeResponse = 0;
  
  //timeResponse = (contextNames.includes("eventtimeresponseweek") ? 7 : 0 
  if(contextNames.includes("eventtimeresponseweek")){
    timeResponse = 7;
  }
  else if(contextNames.includes("eventtimeresponsemonth")){
    timeResponse = 30;
  }
  else if(contextNames.includes("eventtimeresponse3month")){
    timeResponse = 90;
  }
  else{
    let contexts = req.body.queryResult.outputContexts;
    require('../helper/eventsquickreply')(contexts[contexts.length - 1].parameters.facebook_sender_id + "");
  }
  
  if(timeResponse === 0){}
    else{
      console.log("time response= " + timeResponse);
      
      let fullurl = new URL('views', process.env.SERVER_URI);
      fullurl.searchParams.set('type', 'eventUpcoming');
      fullurl.searchParams.set('timeResponse', timeResponse.toString());
      
      let reply = require('../helper/facebookbutton')(fullurl, 'Events');
      
      res.status(200).json(reply);
    }
}
