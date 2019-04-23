"use strict";

const URL = require('url').URL;

module.exports = async function(req, res) {
  let fullurl = new URL('views',process.env.SERVER_URI);
  fullurl.searchParams.set('type', 'listPathways');
  
  require("../database/getPathway")().then(pathways => { 
    let imgurls = [];
    let pathwaynames = [];
    let urls = [];

    pathways.forEach(pathway => {

      pathwaynames.push(pathway.pathway); 
      imgurls.push(pathway.imgurl);

      let fullurl = new URL('views',process.env.SERVER_URI);
      fullurl.searchParams.set('type', 'listPathways');
      fullurl.searchParams.set('pathway', pathway.pathway);
      urls.push(fullurl);
  })
    
    return {imgurls: imgurls, pathwaynames: pathwaynames, urls: urls};
  
  }).then(x => {
    let reply = require('../helper/facebookcarousel.js')(x.pathwaynames, x.urls, x.imgurls)
    res.status(200).json(reply)
  });
  
}