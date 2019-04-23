"use strict";

const getPathway = require("../database/getPathway");

module.exports = async function(req, res) {     
  
  let pathway   = req.query.pathway;

  getPathway(pathway).then(path => {
        res.render('../views/advisor.ejs', {database: path});
      });
}