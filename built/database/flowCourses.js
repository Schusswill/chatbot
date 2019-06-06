"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let Course = require("../model/course");
/*
*Precondition: at least one feild must be filled
*/
module.exports = function (subject, course, fullName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (subject === '') {
            subject = undefined;
        }
        if (course === '') {
            course = undefined;
        }
        if (fullName === '') {
            fullName = undefined;
        }
        return shim(subject, course, fullName);
        function shim(subject = new RegExp("."), course = new RegExp("."), fullName = new RegExp(".")) {
            let number = new RegExp(".");
            if (course instanceof String || typeof (course) === "string") {
                let number2 = course.split("-")[1];
                let subject2 = course.split("-")[0];
                return Course.find({ 'realTimes.instructor': fullName, 'subject': subject2, number: number2 });
            }
            else {
                //console.log( "[query]: " + fullName + " " + subject + " " + number );
                return Course.find({ 'realTimes.instructor': fullName, 'subject': subject, number: number });
            }
        }
    });
};
