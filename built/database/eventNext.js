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
//used from date-fns
const date_fns_1 = require("date-fns");
let Event = require('../model/event');
//returns closest event to current date
module.exports = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return Event.find().then(calendarevents => {
            let todayDate = new Date();
            //Filter array to only include future dates.
            let filterevents = calendarevents.filter(event => {
                let parseddate = date_fns_1.parse(event.date);
                return date_fns_1.isAfter(parseddate, todayDate);
            });
            //Grab the dates from the events.
            let datesFromFilter = filterevents.map(event => {
                return date_fns_1.parse(event.date);
            });
            //find the index of the closest upcoming event
            let closestIndex = date_fns_1.closestIndexTo(todayDate, datesFromFilter);
            return filterevents[closestIndex];
        });
    });
};
