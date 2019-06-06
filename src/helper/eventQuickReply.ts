import * as request from 'request';
//parameters: messagePrompt= message on the quick reply
//            replyList= each string in the array represents a button's name

module.exports = async function(facebookid: number, messagePrompt: string, replyList: string[]){
  const url   = "https://graph.facebook.com/v2.6/me/messages?access_token=";
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
          "content_type":"text",
          "title":"placeholder",
          "payload":"placeholder"
          }]
      }
   }
   
    body["message"]["text"] = messagePrompt;
    body["message"]["quick_replies"].pop() //removes type placeholder
  
    replyList.forEach( reply => {
      body["message"]["quick_replies"].push({
      "content_type": "text",
      "title": reply,
      "payload": reply})
    });
   
   let options = {
      uri: url + token,
      method: 'POST',
      json: body
    };

  request(options);
}
