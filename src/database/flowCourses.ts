"use strict";

let Course     = require("../model/course");
/*
*Precondition: at least one feild must be filled
*/
module.exports = async function(subject, course, fullName){

  if(subject  === '') {subject  = undefined;}
  if(course   === '') {course   = undefined;}
  if(fullName === '') {fullName = undefined;}
  
  return shim(subject, course, fullName);
  
  function shim(subject = new RegExp ("."), course = new RegExp ("."), fullName = new RegExp (".")){
    
    let number = new RegExp (".");
    
    if(course instanceof String){
      let number2     = course.split("-")[1];
      let subject2     = course.split("-")[0];
      return Course.find({'realTimes.instructor': fullName, 'subject' : subject2, number: number2 });
    } else {
    
    //console.log( "[query]: " + fullName + " " + subject + " " + number );
    
    return Course.find({'realTimes.instructor': fullName, 'subject' : subject, number: number });
    }
  }
  

    

  
}