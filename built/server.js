"use strict";
let rm = require("reflect-metadata");
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let connection = require("./connection");
// Use bodyParser to handle json
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//when initializing a messenger bot, you need to verify a token
//by replying 'hub.challenge' to the request
// """verified""" is a token used to identify the fb bot
app.get("/action", function (req, res) {
    console.log("inside verify fb messenger");
    if (req.query['hub.verify_token'] === "mnscu-bot") {
        res.send(req.query['hub.challenge']);
    }
    else {
        res.send('Error, wrong validation token');
    }
});
// The API endpoint for the requests from Dialog Flow
app.post("/action", (req, res) => {
    let actions = require('./actions');
    actions(req, res);
});
// Server side generated templated HTML pages
app.get("/views", require('./views'));
// listen for requests :)
app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + process.env.PORT);
});
let mysql = require('promise-mysql');
let sqlpool = mysql.createPool({
    host: "remotemysql.com",
    user: "ElC9faCSwU",
    password: "IMEtBLHkZN",
    database: "ElC9faCSwU",
    supportBigNumbers: true
});
let query = require("./sql/safesql").flowCoursesQuery("Marta", "Lindberg Lein");
console.log(query);
sqlpool.query(query).then(function (rows) {
    console.log(rows);
});
/*
require("./sql/safesql").teacherTimes().then(x => console.log(x));
require("./sql/safesql").teacherTimes("mark").then(x => console.log(x));
require("./sql/safesql").teacherTimes("mark", "derosier").then(x => console.log(x));
require("./sql/safesql").teacherTimes("mark", "derosier", "CSCI").then(x => console.log(x));
require("./sql/safesql").teacherTimes("mark", "derosier", "CSCI", "1082").then(x => console.log(x));
require("./sql/safesql").teacherTimes("mark", "derosier", undefined, "1082").then(x => console.log(x));

require("./sql/safesql").teacherTimes("Marta", "Lindberg Lein").then(x => console.log(x));

require("./sql/safesql").teacherTimes(undefined, "Lindberg Lein").then(x => console.log(x));
*/
