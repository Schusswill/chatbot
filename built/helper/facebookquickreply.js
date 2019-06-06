"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require('request');
module.exports = function (facebookid, messagetxt, qr0, qr1) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://graph.facebook.com/v2.6/me/messages?access_token=";
        const token = process.env.FACEBOOK_TOKEN;
        // let quickreplies = []
        let body = {
            "messaging_type": "RESPONSE",
            "recipient": {
                "id": facebookid
            },
            "message": {
                "text": messagetxt,
                "quick_replies": [
                    {
                        content_type: "text",
                        title: qr0,
                        payload: qr0
                    },
                    {
                        content_type: "text",
                        title: qr1,
                        payload: qr1
                    }
                ]
            }
        };
        let options = {
            uri: url + token,
            method: 'POST',
            json: body
        };
        //   function makeQuickReplies(title, payload){
        //     return{
        //       "content_type": "text",
        //       "title": title,
        //       "payload": payload,
        //     }
        //   }
        request(options);
        /*
        request(options, function (error, response, body) {
        console.log(body);
        });
        */
    });
};
