"use strict";

//const datefns = require("date-fns");
//const Event = require("../model/event");
//import * as date-fns from 'date-fns';
//import * as Event from '../model/event';

//date-dns has no default export
import {addDays} from 'date-fns';
import {isWithinRange} from 'date-fns';
let Event = require('../model/event');

module.exports = async function(daysLater){
  
  let todayDate = new Date();
  let laterDate = addDays(todayDate, daysLater);
  
  return Event.find().then(calendarevent => {
    
    let todayDate = new Date();
    let laterDate = addDays(todayDate, daysLater);
    return calendarevent.filter( e => {
      return isWithinRange(e.date, todayDate, laterDate);
    });
  });
}
