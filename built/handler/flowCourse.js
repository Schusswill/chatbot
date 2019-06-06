"use strict";
/*
*William Schussler
*/
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
module.exports = function (body, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log(body.result.contexts[0]);
        let fullurl = new url_1.URL('views', process.env.SERVER_URI);
        let params = body.queryResult.parameters;
        let contexts = body.queryResult.outputContexts;
        // console.log("req:");
        // console.log(body);
        // console.log("contexts:");
        // console.log(contexts);
        fullurl.searchParams.set('type', 'flowCourse');
        fullurl.searchParams.set('subject', params.subject);
        fullurl.searchParams.set('courses', params.courses);
        fullurl.searchParams.set('lastname', params.lName);
        fullurl.searchParams.set('firstname', params.fName);
        if (params.subject === '' &&
            params.courses === '' &&
            params.lName === '' &&
            params.fName === '') {
            res.status(200).json({ fulfillmentText: "You can ask me about courses, based on teacher name, course name, subject, and class id" });
        }
        else {
            //create message string to pass to facebookbutton
            let msgtext = "click the button to view ";
            let fullname = "";
            if (params.fName === "" || params.lName === "") { }
            else {
                fullname = params.fName + " " + params.lName;
            }
            if (params.subject === "") {
                if (!(params.courses === '') && fullname === "") {
                    msgtext += params.courses + " sections offered";
                }
                if (params.courses === '' && !(fullname === "")) {
                    msgtext += "the courses " + fullname + " teaches";
                }
                if (!(params.courses === '') && !(fullname === "")) {
                    msgtext += params.courses + " sections " + fullname + " teaches";
                }
            }
            else {
                if (params.courses === '' && fullname === "") {
                    msgtext += params.subject + " courses";
                }
                if (params.courses === '' && !(fullname === "")) {
                    msgtext += params.subject + " courses that " + fullname + " teaches";
                }
            }
            //create facebook button
            let reply = require('../helper/facebookbutton')(fullurl, 'courses', msgtext);
            //send facebook button
            res.status(200).json(reply);
            //test if teacher name was last param added, if it is send the user a quickreply to ask if they want to keep the prof as a param 
            let activecontexts = contexts.filter(context => { return context.hasOwnProperty('lifespanCount'); });
            if (activecontexts.filter(context => { return context.name.includes("getcourse-name-contex"); }).length > 0) {
                setTimeout(() => {
                    require('../helper/facebookquickreply')(contexts[contexts.length - 1].parameters.facebook_sender_id, "Do you want to continue using " + fullname + " in future seaches?", "yes", "no");
                }, 2000);
            }
        }
    });
};
