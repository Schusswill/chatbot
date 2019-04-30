"use strict";


let Pathway = require('../model/pathway');
import * as Advisor from '../model/advisor';
import * as Program from '../model/program';


//if empty, return everything. 
module.exports = async function(pathway = "") {
  
  if (pathway === "") {return Pathway.find().populate(["programs advisors"])}
  else                {return Pathway.find({pathway: pathway}).populate(["programs advisors"])}
    
}