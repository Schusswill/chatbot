'use strict';

let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdvisorSchema = new Schema({
  "name" : String,
  "phone" : String,
  "email" : String,
  "title" : String
});

var PathwaySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  "pathway": String,
  "programs": [{type: Schema.Types.ObjectId, ref : 'Program'}],
  "advisors": [AdvisorSchema],
  "imgurl" : String
});


module.exports = mongoose.model("Pathway", PathwaySchema);
