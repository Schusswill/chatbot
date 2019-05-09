const request = require('request');

module.exports = async function(facebookid : number, messagetxt : string, qr0 : string, qr1: string) { 
  const url   = "https://graph.facebook.com/v2.6/me/messages?access_token=";
  const token = process.env.FACEBOOK_TOKEN;
  // let quickreplies = []
  
  let body = { 
      "messaging_type": "RESPONSE",
      "recipient": {
        "id": facebookid 
      },
      "message": {
        "text": messagetxt,
        
        "quick_replies":[
          {
            content_type:"text",
            title:qr0,
            payload:qr0
          },
          {
            content_type:"text",
            title:qr1,
            payload:qr1
          }
          ]
      }  
    }
   
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
  
}