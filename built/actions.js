// Takes different actions based on type given by dialogeFlow
"use strict";
module.exports = function (req, res) {
    var action = req.body.queryResult.action;
    //using unnamed imports
    switch (action) {
        case "listPathways":
            require("./handler/listPathways")(req, res);
            break;
        case "advisor.findByPathway":
            require("./handler/advisorByPathway")(req, res);
            break;
        case "flow.course.action":
            require("./handler/flowCourse")(req, res);
            break;
        case "events.next":
            require("./handler/eventNext")(req, res);
            break;
        case "events.upcoming":
            require("./handler/eventUpcoming")(req, res);
            break;
        default:
            console.log(action + " not recognized");
            break;
    }
};
//# sourceMappingURL=actions.js.map