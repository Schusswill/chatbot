import * as mysql from "promise-mysql";

export function flowCoursesQuery(firstname?: string,
                                  lastname?: string, 
                                   subject?: string, 
                                 course_id?: string) {
 
  
//base query, for all situations only a couple WHERE clauses have to be tacked on
 const query = `\
SELECT \
  faculty.firstname,\
  faculty.lastname,\
  section.course_subject,\
  times.days,\
  times.starttime,\
  times.endtime \
FROM times\
  INNER JOIN faculty ON times.faculty_id = faculty.faculty_id\
  INNER JOIN section ON section.section_id = times.section_id `;
 
 
 let firstClause = true;
  
 //accumulator, building up query. Direct input is escaped, so safe from SQL injections.
 let accum = query;
  
 if(firstname === undefined) {} else {
   if(firstClause) {accum += "WHERE ";} else {accum += "AND ";}  //if first clause prefix with WHERE, otherwise AND.
   accum += " faculty.firstname = "   + mysql.escape(firstname);
   firstClause = false;
 }
  
 if(lastname  === undefined) {} else {
   if(firstClause) {accum += "WHERE ";} else {accum += "AND ";}
   accum += " faculty.lastname = "      + mysql.escape(lastname);
   firstClause = false;
 }
  
 if(subject   === undefined) {} else {
   if(firstClause) {accum += "WHERE ";} else {accum += "AND ";}
   accum += " section.subject = "       + mysql.escape(subject);
   firstClause = false;
 }
  
 if(course_id === undefined) {} else {
   if(firstClause) {accum += "WHERE ";} else {accum += "AND ";}
   accum += " section.course_number = " + mysql.escape(course_id);
   firstClause = false;
 }
  
  
 return accum;
  

}