import * as request from 'request';

/*
 *description: prompts quickreply with options: One Week, One Month, or Three Months
 *        -used hand-to-hand with DialogFlow events.upcoming - week, month, 3months
 */
module.exports = async function(facebookid: number) { 
  const url   = "https://graph.facebook.com/v2.6/me/messages?access_token=";
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
          "payload":"One Week"
          },
          {
            content_type:"text",
            title:"One Month",
            payload:"One Month"
          },
          {
            content_type:"text",
            title:"Three Months",
            payload:"Three Months"
          }
      ]
      }  
    }
   
   let options = {
      uri: url + token,
      method: 'POST',
      json: body
    };
 

  request(options);
  
  /*
  request(options, function (error, response, body) {
  console.log(body);
  });
  */
  
}