module.exports = async function(req, res ){
 
  const getPathway = require("../database/getPathway");
  
  let pathway   = req.query.pathway;

  getPathway(pathway).then((pathways: any) => {
        res.render("../views/pathways.ejs", {database: pathways}); 
      });

}