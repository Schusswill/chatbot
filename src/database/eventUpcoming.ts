//imported functions from date-fns
import {addDays, isWithinRange} from 'date-fns';

let Event = require('../model/event');

/*
 * description: Returns all events from startDate to daysLater
 * @param     : startDate= beginning date, daysLater= days of a month or day range
 * @return    : all the events from the startDate to the daysLater
 */
module.exports = async function(startDate, daysLater){
  
  return Event.find().then(calendarevent => {
    let laterDate = addDays(startDate, daysLater);
    
    return calendarevent.filter( events => {
      return isWithinRange(events.date, startDate, laterDate);
    });
  });
}
