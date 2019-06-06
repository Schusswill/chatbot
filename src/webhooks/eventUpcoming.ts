import {parse} from 'date-fns';

module.exports = async function(req, res) {
  const getEventUpcoming = require("../database/eventUpcoming");
  
  let timeResponse = Number(req.query.timeResponse);
  let startDate = parse(req.query.startDate);
  
  getEventUpcoming(startDate, timeResponse).then( e => {
    res.render("../views/eventUpcoming.ejs", {event: e}); 
  });
}
