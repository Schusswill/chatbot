//imported functions from date-fns
import {addDays, isWithinRange} from 'date-fns';

let Event = require('../model/event');

/*
 * description: Returns all events within a certain startDate and endDate
 * @param     : daysLater = 7, 30, 90, or any number
 * @return    : all the evens from the startDate to the endDate
 */
module.exports = async function(startDate, daysLater){
  
  return Event.find().then(calendarevent => {
    let laterDate = addDays(startDate, daysLater);
    
    return calendarevent.filter( events => {
      return isWithinRange(events.date, startDate, laterDate);
    });
  });
}
