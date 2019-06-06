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
let Event = require('../model/event');
module.exports = function (givenDate) {
    return __awaiter(this, void 0, void 0, function* () {
        return Event.find().then(calendarEvents => {
            //convert database events.date from a string to date format
            let convertedDates = calendarEvents.map(e => {
                return date_fns_1.parse(e.date);
            });
            //sameEvents = all the events, if any, for the givenDate
            let sameEvents = calendarEvents.filter(sd => {
                return date_fns_1.isSameDay(sd.date, givenDate);
            });
            //if no events for givenDate, return the closest events before or after givenDate
            if (sameEvents.length === 0) {
                let closestDate = calendarEvents[date_fns_1.closestIndexTo(givenDate, convertedDates)].date;
                return calendarEvents.filter(cd => {
                    return date_fns_1.isSameDay(cd.date, closestDate);
                });
                //return multiple events if any on the givenDate
            }
            else {
                return sameEvents;
            }
        });
    });
};
