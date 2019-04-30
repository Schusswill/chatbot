'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
//let mongoose = require('mongoose');
var mongoose = require("mongoose");
var EventSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    "title": String,
    "date": String,
    "link": String,
    "time": String
});
module.exports = mongoose.model("Event", EventSchema);
//# sourceMappingURL=event.js.map