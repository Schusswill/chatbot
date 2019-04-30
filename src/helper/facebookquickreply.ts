"use strict";


const request = require('request');

module.exports = async function(facebookid, teachername) { 
  const url   = "https://graph.facebook.com/v2.6/me/messages?access_token=";
  const token = process.env.FACEBOOK_TOKEN;
  
   let body = { 
      "messaging_type": "RESPONSE",
      "recipient": {
        "id": facebookid 
      },
      "message": {
        "text": "do you want to keep using " + teachername + " in future searches?",
        
        "quick_replies":[
          {
          "content_type":"text",
          "title":"yes",
          "payload":"yes",
          },
          {
            content_type:"text",
            title:"no",
            payload:"no",
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
    }
    
  }

  
  request(options, function (error, response, body) {
  console.log(body);
  });
  
}