"use strict";
const datefns = require("date-fns");
const Event = require("../model/event");

module.exports = async function(daysLater){
  
  let todayDate = new Date();
  let laterDate = todayDate.addDays(daysLater);
  return Event.find().filter(calanderevent => {
    return datefns.isWithinRange(calanderevent, todayDate, laterDate)
  });
  
  
  //placeholder
}