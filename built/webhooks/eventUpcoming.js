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
const date_fns_1 = require("date-fns");
module.exports = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const getEventUpcoming = require("../database/eventUpcoming");
        let timeResponse = Number(req.query.timeResponse);
        let startDate = date_fns_1.parse(req.query.startDate);
        getEventUpcoming(startDate, timeResponse).then(e => {
            res.render("../views/eventUpcoming.ejs", { event: e });
        });
    });
};
