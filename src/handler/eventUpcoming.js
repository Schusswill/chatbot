"use strict";

const URL = require('url').URL;


module.exports = async function(req, res) { 
  let userContexts = req.body.queryResult.outputContexts;
  
  let contextNames = userContexts.map(e => {
    e.name = e.name.split("/");
    return e.name[e.name.length-1];
  });
  
  console.log(contextNames);
  let timeResponse = 0;
  
  if(contextNames.includes("eventtimeresponseweek")){
    timeResponse = 7;
    //res.status(200).json({fulfillmentText: "in week"});
    console.log("eventRespontWeek");
  }
  else if(contextNames.includes("eventtimeresponsemonth")){
    timeResponse = 30;
    //res.status(200).json({fulfillmentText: "in month"});
    console.log("eventResponseMonth");
  }
  else if(contextNames.includes("eventtimeresponse3month")){
    timeResponse = 90;
    //res.status(200).json({fulfillmentText: "in 3 month"});
    console.log("eventResponse3Month");
  }
  else{
    if(timeResponse === 0){
      console.log("timeResponse= " + timeResponse);
      let contexts = req.body.queryResult.outputContexts;
      require('../helper/eventsquickreply')(contexts[contexts.length - 1].parameters.facebook_sender_id + "");
    }
    else{
      console.log("timeResponse= " + timeResponse);
      let reply = require("../src/database/eventUpcoming")(timeResponse);
      res.status(200).json(reply);
    }
  }
}