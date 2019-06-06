"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const getFlowCourses = require("../database/flowCourses");
        let abbrev = req.query.subject; //like subject, but directly sent by facebook. IE, CSCI etc,
        let courses = req.query.courses;
        let firstname = req.query.firstname;
        let lastname = req.query.lastname;
        // console.log(req.query);
        let fullname = '';
        if (firstname === '' ||
            firstname === undefined ||
            lastname === '' ||
            lastname === undefined) { }
        else {
            fullname = req.query.lastname + "," + req.query.firstname;
        }
        getFlowCourses(abbrev, courses, fullname).then((classes) => {
            return require('../helper/seperateSemesters.js')(classes);
        }).then((semesterStruct) => {
            res.render("../views/courses.ejs", { semester: semesterStruct,
                coursename: courses,
                teachername: firstname + " " + lastname });
        });
    });
};
