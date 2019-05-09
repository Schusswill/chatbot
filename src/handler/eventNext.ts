//returns the closest event to todays date
module.exports = async function(res) { 
  require('../database/eventNext')().then(reply => {
    
    res.status(200).json({
      fulfillmentText: reply.date  + " "  + 
                       reply.time  + "\n" +  
                       reply.title + "\n" + 
                       reply.link});
    
  });
}
