// !! schema is incomplete !!

'use strict';

let mongoose = require('mongoose');
var Schema = mongoose.Schema

var StudyContactSchema = new Schema({
  "name" : String,
  "phone" : String,
  "email" : String,
  "title" : String
});


var StudySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  "study": String,
  "type": String,   //degree, certificate or diploma
  "pathway": String,
  "program": String,
  "totalCredits": String,
  "description": String,
  "contacts": [StudyContactSchema],
  "url": String
});


module.exports = mongoose.model("Study", StudySchema);
