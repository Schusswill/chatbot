// !! schema is incomplete !!

'use strict';


import * as mongoose from 'mongoose';


var StudyContactSchema = new mongoose.Schema({
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
