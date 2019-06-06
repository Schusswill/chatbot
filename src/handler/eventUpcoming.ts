//imported functions from date-fns
import {parse, differenceInCalendarDays, isThisYear, subYears} from 'date-fns';
import {URL} from 'url';

module.exports = async function(body, res) { 
  let userContexts = body.queryResult.outputContexts;
  
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
  //startDate is changed to a new date if a specific month is entered, but by default it is todays date
  let startDate = new Date();
  
  //If the user was looking for one week (from quickreply)
  if(contextNames.includes("eventtimeresponseweek")){
    timeResponse = 7;
  }
  
  //If the user was looking for one month (from quickreply)
  else if(contextNames.includes("eventtimeresponsemonth")){
    timeResponse = 30;
  }
  
  //If the user was looking for three months (from quickreply)
  else if(contextNames.includes("eventtimeresponse3month")){
    timeResponse = 90;
  }
  
  //If the user asks for events, but does not specify a specific timeline
  else if(contextNames.includes("eventtimeresponse")){
    //invoke quickreplies to user
    let contexts = body.queryResult.outputContexts;
    require('../helper/eventQuickReply')(contexts[contexts.length - 1].parameters.facebook_sender_id,
      "What timeline were you thinking", ["One Week", "One Month", "One Month"]);
  }
  
  //If the user is looking for a specific timeline
  else if(contextNames.includes("eventinunit")){
    let period   = body.queryResult.parameters.dateperiod;
    startDate    = parse(period.startDate);
    let end      = parse(period.endDate);
    timeResponse = differenceInCalendarDays(end, startDate);
    
    
    //Kinda bad because it keeps you from asking about the next year
    //Check for if dialogflow sends next year instead of this year
    //hardcodes everything to the currennt year
    if(!isThisYear(startDate)){
      startDate = (subYears(startDate, 1));
      end = (subYears(end, 1));
      timeResponse = differenceInCalendarDays(end, startDate); 
    }
  }
  
  //If the user is specifies (x, unit) to look for events
  else{
    //set timeResponse with given data from dialogFlow. ex: "Events in 2 weeks"
    let quantity = body.queryResult.parameters.number;
    let unit     = body.queryResult.parameters.unit;
    timeResponse = quantity * unit;
  }
  
  //Sends user courses
  if(timeResponse !== 0){
    let fullurl = new URL('views', process.env.SERVER_URI);
    fullurl.searchParams.set('type', 'eventUpcoming');
    fullurl.searchParams.set('timeResponse', timeResponse.toString());
    fullurl.searchParams.set('startDate', startDate.toString());

    let reply = require('../helper/facebookbutton')(fullurl, 'Events');
    res.status(200).json(reply);
  }
}
