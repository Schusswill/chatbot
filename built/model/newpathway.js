'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var PathwaySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    "pathway": String,
    "programs": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
    "imgurl": String
});
module.exports = mongoose.model("Pathway", PathwaySchema);
//# sourceMappingURL=newpathway.js.map