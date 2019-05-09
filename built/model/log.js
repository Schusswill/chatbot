"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var logSchema = new mongoose.Schema({
    "time": Date,
    "log": String
});
module.exports = mongoose.model("Log", logSchema);
//# sourceMappingURL=log.js.map