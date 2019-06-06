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
const request = require("request");
//parameters: messagePrompt= message on the quick reply
//            replyList= each string in the array represents a button's name
module.exports = function (facebookid, messagePrompt, replyList) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://graph.facebook.com/v2.6/me/messages?access_token=";
        const token = process.env.FACEBOOK_TOKEN;
        let body = {
            "messaging_type": "RESPONSE",
            "recipient": {
                "id": facebookid
            },
            "message": {
                "text": "",
                "quick_replies": [
                    {
                        "content_type": "text",
                        "title": "placeholder",
                        "payload": "placeholder"
                    }
                ]
            }
        };
        body["message"]["text"] = messagePrompt;
        body["message"]["quick_replies"].pop(); //removes type placeholder
        replyList.forEach(reply => {
            body["message"]["quick_replies"].push({
                "content_type": "text",
                "title": reply,
                "payload": reply
            });
        });
        let options = {
            uri: url + token,
            method: 'POST',
            json: body
        };
        request(options);
    });
};
