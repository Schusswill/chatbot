// Renders HTML pages when facebook user presses button

const querystring = require('querystring');

module.exports = function(req, res) {
  
  let type      = req.query.type;
  
  console.log("views: ");
  console.log(type);  
  switch(type) 
  { 
    case 'flowCourse':       require('./webhooks/flowCourses')     (req,res);  break; 
    case 'listPathways':     require('./webhooks/listPathways')    (req,res);  break; 
    case 'advisorByPathway': require('./webhooks/advisorByPathway')(req,res);  break;  
    case 'eventUpcoming':    require('./webhooks/eventUpcoming')   (req,res);  break;
  } 
}
