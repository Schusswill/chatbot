
"use strict";

let semestertimes = require("../datatype/starttimes");
let dateFns = require("date-fns");


module.exports = function() {
  
  let currentDate = Date();
  
  let futureOrCurrentSemesters = semestertimes.filter( time => {
    let range = dateFns.isWithinRange(currentDate, time.start, time.end);
    let future = dateFns.isAfter(time.start, currentDate);
    return range || future;
  });
  
  
  return futureOrCurrentSemesters;

  
}
