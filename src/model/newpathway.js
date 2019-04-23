'use strict';

let mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PathwaySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  "pathway": String,
  "programs": [{type: Schema.Types.ObjectId, ref : 'Program'}],
  "imgurl" : String
});


module.exports = mongoose.model("Pathway", PathwaySchema);