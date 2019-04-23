'use strict';

let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProgramSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  "program": String,
  "pathway": String,
  "studies": [{type: Schema.Types.ObjectId, ref : 'Study'}],
  "description": String,
  "url": String
});

module.exports = mongoose.model("Program", ProgramSchema);