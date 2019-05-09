"use strict";
// !! schema is incomplete !!
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var CourseSchema = new mongoose.Schema({
    courseID: Number,
    subject: String,
    section: String,
    credits: String,
    description: String
});
var StudySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    "study": String,
    "credits": String,
    //"courses": [{type: Schema.Types.ObjectId, ref : 'Course'}],
    "courses": [CourseSchema],
    "description": String,
    "url": String
});
module.exports = mongoose.model("Study", StudySchema);
//# sourceMappingURL=study.js.map