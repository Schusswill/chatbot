//seperates semesters by term
//returns courseBySemester

module.exports = function(courselist) {
  
  
  let courseBySemester: {fall: any[], spring: any[], summer: any[]} = {
        fall: [],
        spring: [],
        summer: []
  }  
  
  courselist.forEach(course => {
    let semester = course.semester.split(" ")[0].toLowerCase();
    
    switch(semester){
      case "fall":
        courseBySemester.fall.push(course);
        break;
        
      case "spring":
        courseBySemester.spring.push(course);
        break;
        
      case "summer":
        courseBySemester.summer.push(course);
        break;
  }
    
  });
  
  return courseBySemester;
  
}