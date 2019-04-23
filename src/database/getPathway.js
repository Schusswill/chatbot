"use strict";

let Pathway    = require("../model/pathway");
let Advisor    = require("../model/advisor");
let Program    = require("../model/program");

//if empty, return everything. 
module.exports = async function(pathway = "") {
  
  if (pathway === "") {return Pathway.find().populate(["programs advisors"])}
  else                {return Pathway.find({pathway: pathway}).populate(["programs advisors"])}
    
}