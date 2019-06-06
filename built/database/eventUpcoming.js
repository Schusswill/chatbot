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
/*
 * description: Returns all events from startDate to daysLater
 * @param     : startDate= beginning date, daysLater= days of a month or day range
 * @return    : all the events from the startDate to the daysLater
 */
module.exports = function (startDate, daysLater) {
    return __awaiter(this, void 0, void 0, function* () {
        return Event.find().then(calendarevent => {
            let laterDate = date_fns_1.addDays(startDate, daysLater);
            return calendarevent.filter(events => {
                return date_fns_1.isWithinRange(events.date, startDate, laterDate);
            });
        });
    });
};
