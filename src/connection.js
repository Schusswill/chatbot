/**
  This 'connection.js' file connects to the mongo data base 
  which is hosted at mlab.com
*/

let mongoose = require("mongoose");
let database = process.env.MONGODB_URI;
mongoose.connect(database, { useNewUrlParser: true });

//we export the function so that we can 'include' it in other files and get a connection
module.exports = mongoose.connection.on('open', function (){ return database; })