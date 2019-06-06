#Events Calendar
=================================
####  Find next event
1. Dialogflow intent "event.next".
2. Sends node.js an action named "event.next".
3. triggers handler "eventNext.ts".
4. triggers database "eventNext.ts" where it grabs the next event.
5. Sends to the user in text format via response.


#### Find an event by a specific date
1. Dialogflow intent "events.byDate".
2. Sends node.js an action named "event.date".
3. triggers handler "eventDate.ts".
4. triggers database "eventDate.ts" where it gets all events from that day.
If theres not any events that day it gets the events from the next closest day.
5. In the handler it formats it into a nicer string and sends it to the user as text via response.

#### Find all events in a time period
- All actions from here are handled in the handler "eventsUpcoming.ts"
##### Dialogflow intent "events.upcoming"
- Triggered when asking for events without specifying a time period
- Sends node.js an action named "events.upcoming"
- node.js responds with quickreply options "one week, one month, 3 months"
	- "one week" triggers intent "events.upcoming - week"
	- "one month" triggers intent "events.upcoming - month"
	- "3 months" triggers intent "events.upcoming - 3 months"
- Each intent has a context to specify it's required data from the server
##### Dialogflow intent "events.upcoming - inUnit"
- Diagflow intent "events.upcoming - inUnit"
- Sends node.js action named "events.upcoming"
	- With Dialogflow parameters @sys.date-period
		- @sys.date-period represents a period in time, with two points for the start and end date of that period
		
##### Dialogflow intent "events.upcoming - unit"
- Dialogflow intent "events.upcoming"
- Sends node.js action "events upcoming"
- Has a unit and multiple that are used to make period ex. "three weeks" "ten days"

#### Note about scrappers
We made new scrappers to combine all the events. But we never ran them because we were in the proccess of switching to SQL. Do not just grab the data from mongoDB, run the scrappers again.