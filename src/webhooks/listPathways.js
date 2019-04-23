"use strict";

const getPathway = require("../database/getPathway");

module.exports = async function(req, res) {
  
  let pathway   = req.query.pathway;

  getPathway(pathway).then(pathways => {
        res.render("../views/pathways.ejs", {database: pathways}); 
      });

}