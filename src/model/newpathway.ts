'use strict';


import * as mongoose from 'mongoose';


var PathwaySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  "pathway": String,
  "programs": [{type: mongoose.Schema.Types.ObjectId, ref : 'Program'}],
  "imgurl" : String
});


module.exports = mongoose.model("Pathway", PathwaySchema);