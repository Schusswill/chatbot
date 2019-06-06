//imported functions from date-fns
import {isSameDay, closestIndexTo, parse} from 'date-fns';

let Event = require('../model/event');

module.exports = async function(givenDate){
  
  return Event.find().then(calendarEvents => {
    
    //convert database events.date from a string to date format
    let convertedDates = calendarEvents.map( e =>{
      return parse(e.date);
    });
    
    //sameEvents = all the events, if any, for the givenDate
    let sameEvents = calendarEvents.filter( sd =>{
      return isSameDay(sd.date, givenDate);
    });
    
    //if no events for givenDate, return the closest events before or after givenDate
    if(sameEvents.length === 0){    
      let closestDate = calendarEvents[closestIndexTo(givenDate, convertedDates)].date;
      
      return calendarEvents.filter( cd => {
        return isSameDay(cd.date, closestDate);
      });
      
    //return multiple events if any on the givenDate
    }else{
      return sameEvents;
    }
  });
  
}
                          
