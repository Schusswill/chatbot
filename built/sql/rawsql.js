"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
//https://github.com/typeorm/typeorm/issues/881#issuecomment-329364169
function teacherTimes(object) {
    return __awaiter(this, void 0, void 0, function* () {
        const manager = typeorm_1.getManager();
        const query = `SELECT 
                       faculty.firstname, \
                       faculty.lastname, \ 
                       section.subject, \ 
                       times.days, \ 
                       times.stime, \ 
                       times.etime \
                  FROM 
                       times INNER JOIN faculty ON times.faculty_idfaculty = faculty.idfaculty \
                             INNER JOIN section ON section.idsection = times.idsection 
                 WHERE;`;
        const queryName = `faculty.firstname = ? AND\
                          faculty.lastname  = ? `;
        const queryNumber = `section.course_number = ? `;
        const querySubject = `section.subject = ?`;
        let firstname = object.firstname;
        let lastname = object.lastname;
        let subject = object.subject;
        let number = object.number;
        let accumulated = query;
        if (firstname == null) {
            //accumulated +=
        }
        return yield manager.query(query);
    });
}
exports.teacherTimes = teacherTimes;
