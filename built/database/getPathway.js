"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let Pathway = require('../model/pathway');
let Program = require('../model/program');
//if empty, return everything. 
module.exports = function (pathway = "") {
    return __awaiter(this, void 0, void 0, function* () {
        if (pathway === "") {
            return Pathway.find().populate(["programs"]);
        }
        else {
            return Pathway.find({ pathway: pathway }).populate(["programs"]);
        }
    });
};
