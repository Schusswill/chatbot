import * as mongoose from 'mongoose';


let logSchema  = new mongoose.Schema({
  "time": Date,
  "log": String
});


module.exports = mongoose.model("Log", logSchema);