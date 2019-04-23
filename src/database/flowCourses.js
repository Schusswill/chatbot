"use strict";

let Course     = require("../model/course");
/*
*Precondition: at least one feild must be filled
*/
module.exports = async function(subject, course, fullName){

  if(subject  === '') subject  = undefined;
  if(course   === '') course   = undefined;
  if(fullName === '') fullName = undefined;
  
  return shim(subject, course, fullName);
  
  function shim(subject = new RegExp ("."), course = new RegExp ("."), fullName = new RegExp (".")){
    
    let number = new RegExp (".");
    
    if(typeof course ===  "string" ){
      number      = course.split("-")[1];
      subject     = course.split("-")[0];
    }
    
    //console.log( "[query]: " + fullName + " " + subject + " " + number );
    
    return Course.find({'realTimes.instructor': fullName, 'subject' : subject, number: number });
  }
  

    

  
}