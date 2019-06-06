/*
*William Schussler
*/

import {URL} from 'url';

module.exports = async function(body, res) {
  //console.log(body.result.contexts[0]);

  
  let fullurl:URL = new URL('views', process.env.SERVER_URI);
  
  let params   = body.queryResult.parameters;
  let contexts = body.queryResult.outputContexts;
 
  // console.log("req:");
  // console.log(body);
  // console.log("contexts:");
  // console.log(contexts);
  
  fullurl.searchParams.set('type',      'flowCourse');
  fullurl.searchParams.set('subject', params.subject);
  fullurl.searchParams.set('courses', params.courses);
  fullurl.searchParams.set('lastname',  params.lName);
  fullurl.searchParams.set('firstname', params.fName);
  
  
  
  
  if(params.subject === '' && 
     params.courses === '' && 
     params.lName   === '' && 
     params.fName   === '') {
    
      res.status(200).json({fulfillmentText: "You can ask me about courses, based on teacher name, course name, subject, and class id"});
      
  } else {
  
  
        //create message string to pass to facebookbutton
        let msgtext:string  = "click the button to view ";
        let fullname:string = "";

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
        let activecontexts = contexts.filter(context =>{return context.hasOwnProperty('lifespanCount');});
        if (activecontexts.filter(context =>{return context.name.includes("getcourse-name-contex");}).length > 0){
        setTimeout(() => 
                     {require('../helper/facebookquickreply')(contexts[contexts.length - 1].parameters.facebook_sender_id,
                                                              "Do you want to continue using " + fullname + " in future seaches?",
                                                              "yes",
                                                              "no")},
                      2000);
        }
  }
}
