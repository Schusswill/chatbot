'use strict';

let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdvisorSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  "name" : String,
  "phone" : String,
  "email" : String,
  "title" : String
});


module.exports = mongoose.model("Advisor", AdvisorSchema);
