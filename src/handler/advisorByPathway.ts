import {URL} from 'url';

//TODO We will need to add the advisors to the database

module.exports = async function(req, res){
  
  let fullurl = new URL('views', process.env.SERVER_URI);
  fullurl.searchParams.set('type', 'advisorByPathway');
  fullurl.searchParams.set('pathway' , req.body.queryResult.parameters.pathway);
  
  let reply = require('../helper/facebookbutton')(fullurl, 'Advisors');
  
  res.status(200).json(reply);
}