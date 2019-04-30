"use strict";
var semestertimes = require("../datatype/starttimes");
var dateFns = require("date-fns");
module.exports = function () {
    var currentDate = Date();
    var futureOrCurrentSemesters = semestertimes.filter(function (time) {
        var range = dateFns.isWithinRange(currentDate, time.start, time.end);
        var future = dateFns.isAfter(time.start, currentDate);
        return range || future;
    });
    return futureOrCurrentSemesters;
};
//# sourceMappingURL=currentSemester.js.map