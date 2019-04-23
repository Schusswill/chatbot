"use strict";
const datefns = require("date-fns");
const Event = require("../model/event");

module.exports = async function(){
  
  return Event.find().then(calendarevents => {
    let todayDate = new Date();
    let filterevents = calendarevents.filter( e => {
      let parseddate = datefns.parse(e.date);
      return datefns.isAfter(parseddate, todayDate);
    });
    
    let datesFromFilter = filterevents.map( e => {
      return datefns.parse(e.date);
    });  
    let closestIndex = datefns.closestIndexTo(todayDate, datesFromFilter);
    
    return filterevents[closestIndex];
  });
}