'use strict';

//let mongoose = require('mongoose');
import * as mongoose from 'mongoose';

var EventSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  "title" : String,
  "date"  : String,
  "link"  : String,
  "time"  : String
});


module.exports = mongoose.model("Event", EventSchema);
