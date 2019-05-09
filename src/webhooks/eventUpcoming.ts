import {parse} from 'date-fns';

module.exports = async function(req, res) {
  const getEventUpcoming = require("../database/eventUpcoming");
  //const querystring = require('querystring');
  
  //ex: req.query.timeResponse = 7, 30, or 90. Represents number of days
  let timeResponse = Number(req.query.timeResponse);
  let startDate = parse(req.query.startDate);
  
  getEventUpcoming(startDate, timeResponse).then( e => {
    res.render("../views/eventUpcoming.ejs", {event: e}); 
  });
}
