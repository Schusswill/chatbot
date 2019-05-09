let Pathway = require('../model/pathway');
let Program = require('../model/program');


//if empty, return everything. 
module.exports = async function(pathway = "") {
  
  if (pathway === "") {return Pathway.find().populate(["programs"])}
  else                {return Pathway.find({pathway: pathway}).populate(["programs"])}
    
}