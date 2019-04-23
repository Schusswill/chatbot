"use strict";


const request = require('request');

module.exports = async function(facebookid) { 
  const url   = "https://graph.facebook.com/v2.6/me/messages?access_token=";
  //const token = "EAAEZARZBdvZCLsBAGmMMaRXlSuUEBvrSMz8uM9vApVtYgR16rjhzXFyx6WvWgL4mK5HQG9cDas7QDVwmKJTmN0SWQ44Xj8slTZBNQGcuDVAmFIBzvGJXoLUnxUKxjzjKpKQyO85CugWZA1SiSJ4NrnG6ENZCild4GgHFaeeforswZDZD";
  const token = process.env.FACEBOOK_TOKEN;
  
   let body = { 
      "messaging_type": "RESPONSE",
      "recipient": {
        "id": facebookid 
      },
      "message": {
        "text": "What timeline were you thinking?",
        
        "quick_replies":[
          {
          "content_type":"text",
          "title":"One Week",
          "payload":"One Week",
          "content_type":"text"
          },
          {
            content_type:"text",
            title:"One Month",
            payload:"One Month",
            content_type:"text"
          },
          {
            content_type:"text",
            title:"Three Months",
            payload:"Three Months",
            content_type:"text"
          }
      ]
      }  
    }
   
   let options = {
      uri: url + token,
      method: 'POST',
      json: body
    };
 
  let quickList = [];
  
  function makeQuickReplies(title, payload){
    return{
      "content_type": "text",
      "title": title,
      "payload": payload,
      "content_type": "text"
    }
    
  }

  
  request(options, function (error, response, body) {
  //console.log(body);
  });
  
}