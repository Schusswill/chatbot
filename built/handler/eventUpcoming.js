"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//imported functions from date-fns
const date_fns_1 = require("date-fns");
const url_1 = require("url");
module.exports = function (body, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userContexts = body.queryResult.outputContexts;
        //Checks for the appropriate contexts from DialogFlow
        let contextNames = userContexts.filter(context => {
            //filters out all the dead contexts
            return context.hasOwnProperty('lifespanCount');
        }).map(realContexts => {
            //grabs only the context name
            realContexts.name = realContexts.name.split("/");
            return realContexts.name[realContexts.name.length - 1];
        });
        //timeResponse represents number of days after the startDate to look for events
        let timeResponse = 0;
        //startDate is changed to a new date if a specific month is entered, but by default it is todays date
        let startDate = new Date();
        //If the user was looking for one week (from quickreply)
        if (contextNames.includes("eventtimeresponseweek")) {
            timeResponse = 7;
        }
        //If the user was looking for one month (from quickreply)
        else if (contextNames.includes("eventtimeresponsemonth")) {
            timeResponse = 30;
        }
        //If the user was looking for three months (from quickreply)
        else if (contextNames.includes("eventtimeresponse3month")) {
            timeResponse = 90;
        }
        //If the user asks for events, but does not specify a specific timeline
        else if (contextNames.includes("eventtimeresponse")) {
            //invoke quickreplies to user
            let contexts = body.queryResult.outputContexts;
            require('../helper/eventQuickReply')(contexts[contexts.length - 1].parameters.facebook_sender_id, "What timeline were you thinking", ["One Week", "One Month", "One Month"]);
        }
        //If the user is looking for a specific timeline
        else if (contextNames.includes("eventinunit")) {
            let period = body.queryResult.parameters.dateperiod;
            startDate = date_fns_1.parse(period.startDate);
            let end = date_fns_1.parse(period.endDate);
            timeResponse = date_fns_1.differenceInCalendarDays(end, startDate);
            //Kinda bad because it keeps you from asking about the next year
            //Check for if dialogflow sends next year instead of this year
            //hardcodes everything to the currennt year
            if (!date_fns_1.isThisYear(startDate)) {
                startDate = (date_fns_1.subYears(startDate, 1));
                end = (date_fns_1.subYears(end, 1));
                timeResponse = date_fns_1.differenceInCalendarDays(end, startDate);
            }
        }
        //If the user is specifies (x, unit) to look for events
        else {
            //set timeResponse with given data from dialogFlow. ex: "Events in 2 weeks"
            let quantity = body.queryResult.parameters.number;
            let unit = body.queryResult.parameters.unit;
            timeResponse = quantity * unit;
        }
        //Sends user courses
        if (timeResponse !== 0) {
            let fullurl = new url_1.URL('views', process.env.SERVER_URI);
            fullurl.searchParams.set('type', 'eventUpcoming');
            fullurl.searchParams.set('timeResponse', timeResponse.toString());
            fullurl.searchParams.set('startDate', startDate.toString());
            let reply = require('../helper/facebookbutton')(fullurl, 'Events');
            res.status(200).json(reply);
        }
    });
};
