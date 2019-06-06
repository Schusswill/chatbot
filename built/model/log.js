"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let logSchema = new mongoose.Schema({
    "time": Date,
    "log": String
});
module.exports = mongoose.model("Log", logSchema);
