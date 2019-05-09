import {URL} from 'url';
import {parse, differenceInCalendarDays} from 'date-fns';

module.exports = async function(req, res) { 
  let userContexts = req.body.queryResult.outputContexts;
  
  //Checks for the appropriate contexts from DialogFlow
  let contextNames = userContexts.filter(context => {
    //filters out all the dead contexts
    return context.hasOwnProperty('lifespanCount');
  }).map(realContexts => {
    //grabs only the context name
    realContexts.name = realContexts.name.split("/");
    return realContexts.name[realContexts.name.length-1];
  });
  
  //timeResponse represents number of days after the startDate to look for events
  let timeResponse = 0;
  //startDate is changed to a new date if a specific month is entered
  let startDate = new Date();
  
  if(contextNames.includes("eventtimeresponseweek")){
    timeResponse = 7;
  }
  else if(contextNames.includes("eventtimeresponsemonth")){
    timeResponse = 30;
  }
  else if(contextNames.includes("eventtimeresponse3month")){
    timeResponse = 90;
  }
  else if(contextNames.includes("eventtimeresponse")){
    //invoke quickreplies to user
    let contexts = req.body.queryResult.outputContexts;
    require('../helper/eventsquickreply')(contexts[contexts.length - 1].parameters.facebook_sender_id);
  }
  else if(contextNames.includes("eventinunit")){
    //gets events in a certain month
    let period = req.body.queryResult.parameters.dateperiod;
    startDate = parse(period.startDate);
    let end = parse(period.endDate);
    timeResponse = differenceInCalendarDays(end, startDate);
  }
  else{
    //set timeResponse with given data from dialogFlow. ex: "Events in 2 weeks"
    let quantity = req.body.queryResult.parameters.number;
    let unit = req.body.queryResult.parameters.unit;
    timeResponse = quantity * unit;
  }
  
  if(timeResponse === 0){} //quickreply options 7, 30, or 90 have yet to be selected by user
    else{
      
      //quickreply options 7, 30, or 90 has been selected
      let fullurl = new URL('views', process.env.SERVER_URI);
      fullurl.searchParams.set('type', 'eventUpcoming');
      fullurl.searchParams.set('timeResponse', timeResponse.toString());
      fullurl.searchParams.set('startDate', startDate.toString());
      
      let reply = require('../helper/facebookbutton')(fullurl, 'Events');
      
      res.status(200).json(reply);
    }
}
