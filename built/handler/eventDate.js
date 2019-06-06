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
module.exports = function (body, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let givenDate = body.queryResult.parameters.date;
        require('../database/eventDate')(givenDate).then(events => {
            let description = "";
            //Multiple events:
            if (events.length > 1) {
                //Same day
                if (date_fns_1.isSameDay(events[0].date, givenDate)) {
                    description += "These are the events on that day:\n\n";
                }
                //Differant day
                else {
                    let preface = "There are no events on that date.\n";
                    let distance = date_fns_1.distanceInWords(givenDate, events[0].date);
                    let relation = date_fns_1.isBefore(events[0].date, givenDate) ? "before" : "after";
                    description += preface + "These are the closest events to that day, they are " + distance + " " + relation + ":\n\n";
                }
                //Single event:
            }
            else {
                //Same day
                if (date_fns_1.isSameDay(events[0].date, givenDate)) {
                    description += "This is the event that day:\n\n";
                }
                //Differant day
                else {
                    let preface = "There are no events on that date.\n";
                    let distance = date_fns_1.distanceInWords(givenDate, events[0].date);
                    let relation = date_fns_1.isBefore(events[0].date, givenDate) ? "before" : "after";
                    description += preface + "This is the closest event to your day, it is " + distance + " " + relation + ":\n\n";
                }
            }
            //eventText = all the events in string format
            let eventText = "";
            events.forEach(event => {
                eventText += event.date + " " +
                    event.time + "\n" +
                    event.title + "\n" +
                    event.link + "\n\n";
            });
            res.status(200).json({ fulfillmentText: description + eventText });
        });
    });
};
