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
const url_1 = require("url");
//TODO We will need to add the advisors to the database
module.exports = function (body, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let fullurl = new url_1.URL('views', process.env.SERVER_URI);
        fullurl.searchParams.set('type', 'advisorByPathway');
        fullurl.searchParams.set('pathway', body.queryResult.parameters.pathway);
        let reply = require('../helper/facebookbutton')(fullurl, 'Advisors');
        res.status(200).json(reply);
    });
};
