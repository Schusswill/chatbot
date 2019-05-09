module.exports = async function(req, res) {

  const getFlowCourses = require("../database/flowCourses");
  
  let abbrev:    string   = req.query.subject;   //like subject, but directly sent by facebook. IE, CSCI etc,
  let courses:   string   = req.query.courses;
  let firstname: string   = req.query.firstname;
  let lastname:  string   = req.query.lastname;
  
  // console.log(req.query);
  let fullname  = '';
  
  if (firstname === ''        ||
      firstname === undefined ||
      lastname  === ''        || 
      lastname  === undefined) {} 
  else {
      fullname  = req.query.lastname + "," + req.query.firstname;
  }
  
  
  getFlowCourses(abbrev, courses, fullname).then((classes: any) => {
     return require('../helper/seperateSemesters.js')(classes);
  }).then((semesterStruct: any) => {
  res.render("../views/courses.ejs", {semester: semesterStruct,
                                      coursename: courses,
                                      teachername: firstname + " " + lastname});
  });
}