/**
  This 'connection.js' file connects to the mongo data base 
  which is hosted at mlab.com
*/
import * as mongoose from "mongoose";

let database = process.env.MONGODB_URI;

//doesnt actually handle any errors if MONGODB_URI is undefined, but its an
//error we don't have to handle. This makes the type cheeker happy, allowing for StrictNullCheck to be true.
if (database === undefined) database = "";

mongoose.connect(database, { useNewUrlParser: true });



//we export the function so that we can 'include' it in other files and get a connection
module.exports = mongoose.connection.on('open', function (){  return database; })