'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var AdvisorSchema = new mongoose.Schema({
    "name": String,
    "phone": String,
    "email": String,
    "title": String
});
var PathwaySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    "pathway": String,
    "programs": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
    "advisors": [AdvisorSchema],
    "imgurl": String
});
module.exports = mongoose.model("Pathway", PathwaySchema);
//# sourceMappingURL=pathway.js.map