// Takes different actions based on type given by dialogeFlow
module.exports = function(req, res) {
  let action = req.body.queryResult.action;
  
  console.log(action);
  


  let Log = require("/app/built/model/log");
  new Log({date: new Date(), log: JSON.stringify(req.body)}).save();
  

  
  
  //using unnamed imports
  switch(action) {
    case "listPathways":          require("./handler/listPathways")    (     res);  break;
    case "events.next":           require("./handler/eventNext")       (     res);  break;
    case "advisor.findByPathway": require("./handler/advisorByPathway")(req, res);  break;  
    case "flow.course.action":    require("./handler/flowCourse")      (req, res);  break;   
    case "events.upcoming":       require("./handler/eventUpcoming")   (req, res);  break;
    case "events.date":           require("./handler/eventDate")       (req, res);  break; 
      
    default:                      console.log(action + " not recognized");          break; 
  }
      
}