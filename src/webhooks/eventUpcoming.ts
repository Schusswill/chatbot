
"use strict";



module.exports = async function(req, res) {
  
  const getEventUpcoming = require("../database/eventUpcoming");
  
  let timeResponse = Number(req.query.timeResponse);
  
  getEventUpcoming(timeResponse).then( e => {
    //console.log(e);
    res.render("../views/eventUpcoming.ejs", {event: e}); 
  });
}
