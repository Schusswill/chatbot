# MN State Bot - Webhook Test
=========================

**Let's make a simple node.js server talk to both Dialogflow and MongoDB, and while we're at it we'll create an express.js REST API and some mongoose.js data models for our MongoDB database.**

-------------------

## Architecture
1. Chat Channel (e.g. Facebook)
2. Dialog Flow
3. Node.js Server
    * Express.js REST API
    * Mongoose Model
4. MongoDB instance on mlab.com

## Implementation notes
### Action naming
Short, peroid delimiated names for case statement matching

## Code Structure

## actions.js
Entry point of dialogFlow talking with the server

## views.js
Entry point of facebook button clicks

### Database functions
`database/` is the folder for all database related functions.
This functions should take simple input and return objects.
They should *NOT* modify the responce to automatically send a reply (nor should it even be the functions scope).

The caller should process the responce themselves, to a reasonable degree. As the chatbot will often show a list of data, not a single element, it is probably safe to have looser queries that send back lists of objects. To reduce work, keep the data in the format it was in from the `model/`, please 
iternate/map over it instead of repackaging it.

Database functions may take optional extra arguments that specify date related information, while abscent the default behavior should be to return all data for current semesters.


## Time
`datatype/startimes.js` is a struct of hardcoded dates thats used to determine current and future semesters. This should eventually be changed to dynamically pull from somewhere. 

## Handlers

`handler/` is the folder for all actions to be taken by a dialogeflow action. They should have the same name. Any helper functions for a handler should go in `helper/`

handlers should pass all their input as URL parameters in a link to facebook.
These parameters are then read server side by viewgen.
Note, there is no authetication, a rogue user could use this to pull database data by editing the url in a webbrowser. 


## Helper
Misc data manipulating functions go in `helper/`.



## webhooks
Facebook and dialogFlow use the same webhook, all webhook requests handlers should be in`webhooks`


# DialogFlow
DialogFlow represents the conversation topic as a finite state machine that slot fills, getting rid of slots when logical.
Completely different topics are different finite state machines, and thus get rid of the context when switching between them.
FAQ questions can be asked at any time and don't break out of the state machine, or change any context information.


# typescript

we are moving to typescript
run `tsc` in console to transpile to JS.
type `refresh` in console to refresh files in glitch.

# typeorm

There is trouble with ORMs in general, to use the set data type and various others, manual SQL queries will be used.


# notes

https://github.com/typeorm/typeorm/issues/235