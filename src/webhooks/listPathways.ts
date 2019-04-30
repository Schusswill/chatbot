"use strict";


module.exports = async function(req, res) {
  
  const getPathway = require("../database/getPathway");
  
  let pathway   = req.query.pathway;

  getPathway(pathway).then(pathways => {
        res.render("../views/pathways.ejs", {database: pathways}); 
      });

}