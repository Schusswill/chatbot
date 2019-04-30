
"use strict";




module.exports = async function(req, res) {     
  
  const getPathway = require("../database/getPathway");
  
  let pathway   = req.query.pathway;

  getPathway(pathway).then(path => {
        res.render('../views/advisor.ejs', {database: path});
      });
}

