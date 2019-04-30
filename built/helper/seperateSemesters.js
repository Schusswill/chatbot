"use strict";
//seperates semesters by term
//returns courseBySemester
module.exports = function (courselist) {
    var courseBySemester = {
        fall: [],
        spring: [],
        summer: []
    };
    courselist.forEach(function (course) {
        var semester = course.semester.split(" ")[0].toLowerCase();
        switch (semester) {
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
};
//# sourceMappingURL=seperateSemesters.js.map