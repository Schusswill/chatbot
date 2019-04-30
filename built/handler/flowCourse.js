"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
module.exports = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var fullurl, params, contexts, msgtext, fullname, reply;
        return __generator(this, function (_a) {
            fullurl = new url_1.URL('views', process.env.SERVER_URI);
            params = req.body.queryResult.parameters;
            contexts = req.body.queryResult.outputContexts;
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
                return [2 /*return*/, undefined]; //early exit
            }
            msgtext = "click the button to view ";
            fullname = "";
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
            reply = require('../helper/facebookbutton')(fullurl, 'courses', msgtext);
            //send facebook button
            res.status(200).json(reply);
            //test if teacher name was last param added, if it is send the user a quickreply to ask if they want to keep the prof as a param
            if (contexts.filter(function (context) { return context.name.includes('getcourse-name-contex'); }).length > 0) {
                //after 2 seconds send the quick reply to the user
                setTimeout(function () { require('../helper/facebookquickreply')(contexts[contexts.length - 1].parameters.facebook_sender_id + "", params.fName + ", " + params.lName); }, 2000);
            }
            return [2 /*return*/];
        });
    });
};
//# sourceMappingURL=flowCourse.js.map