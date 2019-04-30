// where your node app starts

// init project
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let ejs = require('ejs');
let connection = require("./connection");


// Use bodyParser to handle json

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


//when initializing a messenger bot, you need to verify a token
//by replying 'hub.challenge' to the request
// """verified""" is a token used to identify the fb bot
app.get("/action", function(req, res){
    console.log("inside verify fb messenger")
  
    if (req.query['hub.verify_token'] === "mnscu-bot") {
      
      res.send(req.query['hub.challenge']);
      
   } else {
     
      res.send('Error, wrong validation token');    
   }
  
});


//this section uses currying and anonymous imports

// The API endpoint for the requests from Dialog Flow
app.post("/action", require('./actions'));
// Server side generated templated HTML pages
app.get("/views",   require('./views'));

// listen for requests :)
app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + process.env.PORT)
});
