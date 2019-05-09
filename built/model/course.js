"use strict";
// for mongoDB connection
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var CourseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courseID: Number,
    subject: String,
    section: String,
    credits: String,
    realTimes: [{
            buildingAndRoom: String,
            dates: String,
            instructor: String,
            days: String,
            time: String
        }],
    number: String,
    seatAvailability: {
        size: String,
        status: String,
        seatsRemaining: String,
        enrolled: String
    },
    title: String,
    locationDetails: {
        campus: String,
        offeredThrough: String,
        location: String
    },
    semester: String,
    url: String,
    costs: {
        nonResident: String,
        resident: String,
        fees: String
    },
    goals: [String]
});
// export mongo schema
module.exports = mongoose.model("Course", CourseSchema);
//# sourceMappingURL=course.js.map