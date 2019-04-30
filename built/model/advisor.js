'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
//dvar Schema = mongoose.Schema;
var AdvisorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    "name": String,
    "phone": String,
    "email": String,
    "title": String
});
module.exports = mongoose.model("Advisor", AdvisorSchema);
//# sourceMappingURL=advisor.js.map