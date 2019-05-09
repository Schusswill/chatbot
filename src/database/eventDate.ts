"use strict";

//imported functions from date-fns
import {isSameDay, closestIndexTo, parse} from 'date-fns';

let Event = require('../model/event');

//testing interface https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
interface Event {
    link: string;
    date: string;
    title: string;
    time: string;
}

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
      //let closestEvents: Array<any> = [];
      let closestDate = calendarEvents[closestIndexTo(givenDate, convertedDates)].date;
      return calendarEvents.filter( cd => {
        return isSameDay(cd.date, closestDate);
      });


    }else{
      return sameEvents;
    }
  });
}
                          
