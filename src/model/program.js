'use strict';

let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProgramContactSchema = new Schema({
  "name" : String,
  "phone" : String,
  "email" : String,
  "title" : String
});

var ProgramSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  "program": String,
  "pathway": String,
  "studies": [{type: Schema.Types.ObjectId, ref : 'Study'}],
  "description": String,
  "contacts": [ProgramContactSchema],
  "url": String
});

module.exports = mongoose.model("Program", ProgramSchema);