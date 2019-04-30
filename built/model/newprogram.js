'use strict';
var mongoose = require('mongoose');
var ProgramSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    "program": String,
    "pathway": String,
    "studies": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Study' }],
    "description": String,
    "url": String
});
module.exports = mongoose.model("Program", ProgramSchema);
//# sourceMappingURL=newprogram.js.map