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
module.exports = function (res) {
    return __awaiter(this, void 0, void 0, function* () {
        require("../database/getPathway")().then(pathways => {
            let imgurls = [];
            let pathwaynames = [];
            let urls = [];
            pathways.forEach(pathway => {
                pathwaynames.push(pathway.pathway);
                imgurls.push(pathway.imgurl);
                let fullurl = new url_1.URL('views', process.env.SERVER_URI);
                fullurl.searchParams.set('type', 'listPathways');
                fullurl.searchParams.set('pathway', pathway.pathway);
                urls.push(fullurl);
            });
            return { imgurls: imgurls, pathwaynames: pathwaynames, urls: urls };
        }).then(x => {
            let reply = require('../helper/facebookcarousel.js')(x.pathwaynames, x.urls, x.imgurls);
            res.status(200).json(reply);
        });
    });
};
