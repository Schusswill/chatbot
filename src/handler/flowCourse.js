"use strict";

const URL = require('url').URL;

module.exports = async function(req, res) {
  //console.log(req.body.result.contexts[0]);

  
  let fullurl = new URL('views', process.env.SERVER_URI);
  
  let params = req.body.queryResult.parameters;
  let contexts = req.body.queryResult.outputContexts;
 
  fullurl.searchParams.set('type', 'flowCourse');
  fullurl.searchParams.set('subject', params.subject);
  fullurl.searchParams.set('courses', params.courses);
  fullurl.searchParams.set('lastname',  params.lName);
  fullurl.searchParams.set('firstname', params.fName);
  
  
  
  
  if(params.subject === '' && 
     params.courses === '' && 
     params.lName   === '' && 
     params.fName   === '') {
    
      res.status(200).json({fulfillmentText: "You can ask me about courses, based on teacher name, course name, subject, and class id"});
      return undefined; //early exit
  } 
  
  
    //create message string to pass to facebookbutton
    let msgtext  = "click the button to view ";
    let fullname = "";
  
    if (params.fName === "" || params.lName === "") {} else 
    {
      fullname = params.fName + " " + params.lName;
    }
  
        
    if(params.subject === "") {
      if(!(params.courses === '') &&   fullname === "") {  msgtext +=  params.courses + " sections offered";}
      if(  params.courses === ''  && !(fullname === "")){  msgtext +=                   "the courses " + fullname + " teaches";}   
      if(!(params.courses === '') && !(fullname === "")){  msgtext +=  params.courses + " sections "   + fullname + " teaches";}
    } else {
      if(  params.courses === ''  &&   fullname === "") {  msgtext +=  params.subject + " courses"}  
      if(  params.courses === ''  && !(fullname === "")){  msgtext +=  params.subject + " courses that " + fullname + " teaches";}
    }
        
    
    
    
    //create facebook button
    let reply = require('../helper/facebookbutton')(fullurl, 'courses', msgtext);
    //send facebook button
    res.status(200).json(reply);
    
    //test if teacher name was last param added, if it is send the user a quickreply to ask if they want to keep the prof as a param
    if(contexts.filter(context => {return context.name.includes('getcourse-name-contex')}).length > 0)
    {
      //after 2 seconds send the quick reply to the user
      setTimeout(() => 
                 {require('../helper/facebookquickreply')(contexts[contexts.length - 1].parameters.facebook_sender_id + "",params.fName +", " + params.lName)},
                 2000);
    }
     
}
