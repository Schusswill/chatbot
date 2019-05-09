//used from date-fns
import {parse, closestIndexTo, isAfter} from 'date-fns';

let Event = require('../model/event');

module.exports = async function(){
  
  return Event.find().then(calendarevents => {
    
    let todayDate = new Date();
    
    //Filter array to only include future dates.
    let filterevents = calendarevents.filter( event => {
      let parseddate = parse(event.date);
      return isAfter(parseddate, todayDate);
    });
    
    //Grab the dates from the events.
    let datesFromFilter = filterevents.map( event => {
      return parse(event.date);
    });  
    
    //find the index of the closest upcoming event
    let closestIndex = closestIndexTo(todayDate, datesFromFilter);
    
    return filterevents[closestIndex];
  });
}