"use strict";

const getFlowCourses = require("../database/flowCourses");

module.exports = async function(req, res) {
  
  let abbrev    = req.query.subject;   //like subject, but directly sent by facebook. IE, CSCI etc,
  let courses   = req.query.courses;
  let firstname = req.query.firstname;
  let lastname  = req.query.lastname;
  
  // console.log(req.query);
  let fullname  = '';
  
  if (firstname === ''        ||
      firstname === undefined ||
      lastname  === ''        || 
      lastname  === undefined) {} 
  else {
      fullname  = req.query.lastname + "," + req.query.firstname;
  }
  
  
  getFlowCourses(abbrev, courses, fullname).then(classes => {
     return require('../helper/seperateSemesters.js')(classes);
  }).then(semesterStruct => {
  res.render("../views/courses.ejs", {semester: semesterStruct,
                                      coursename: courses,
                                      teachername: firstname + " " + lastname});
  });
}