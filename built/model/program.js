"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var ProgramContactSchema = new mongoose.Schema({
    "name": String,
    "phone": String,
    "email": String,
    "title": String
});
var ProgramSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    "program": String,
    "pathway": String,
    "studies": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Study' }],
    "description": String,
    "contacts": [ProgramContactSchema],
    "url": String
});
module.exports = mongoose.model("Program", ProgramSchema);
