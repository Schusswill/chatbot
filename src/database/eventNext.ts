"use strict";

//used from date-fns
import {parse} from 'date-fns';
import {closestIndexTo} from 'date-fns';
import {isAfter} from 'date-fns';

let Event = require('../model/event');

//import * as date-fns from 'date-fns';
//import * as Event from '../model/event';
//const datefns = require("date-fns");
//const Event = require("../model/event");

module.exports = async function(){
  
  return Event.find().then(calendarevents => {
    
    let todayDate = new Date();
    
    let filterevents = calendarevents.filter( e => {
      
      let parseddate = parse(e.date);
      return isAfter(parseddate, todayDate);
      
    });
    
    let datesFromFilter = filterevents.map( e => {
      return parse(e.date);
    });  
    
    let closestIndex = closestIndexTo(todayDate, datesFromFilter);
    
    return filterevents[closestIndex];
  });
}