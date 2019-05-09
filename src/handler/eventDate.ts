//imported functions from date-fns
import {isBefore, isSameDay, distanceInWords} from 'date-fns';

module.exports = async function(req, res) { 
  let givenDate = req.body.queryResult.parameters.date;
  
  require('../database/eventDate')(givenDate).then(events => {
    
    let description = "";
    
    //Multiple events:
    if(events.length > 1){
      
      //Same day
      if(isSameDay(events[0].date, givenDate)){
        description +=  "These are the events on that day:\n\n"
      }
      
      //Differant day
      else{
        let preface = "There are no events on that date.\n";
        let distance = distanceInWords(givenDate, events[0].date);
        let relation = isBefore(events[0].date, givenDate) ? "before" : "after";
        description += preface + "These are the closest events to that day, they are " + distance + " " + relation + ":\n\n";
      }
      
    //Single event:
    }else{
      
      //Same day
      if(isSameDay(events[0].date, givenDate)){
         description += "This is the event that day:\n\n"
      }
      
      //Differant day
      else{
        let preface = "There are no events on that date.\n";
        let distance = distanceInWords(givenDate, events[0].date);
        let relation = isBefore(events[0].date, givenDate) ? "before" : "after";
        description += preface + "This is the closest event to your day, it is " + distance + " " + relation + ":\n\n";
    }
      
      
    }
    
    //eventText = all the events in string format
    let eventText = "";
    events.forEach( event =>{
      eventText += event.date  + " "  +
                    event.time  + "\n" +
                    event.title + "\n" +
                    event.link + "\n\n";
    });
    
    res.status(200).json({fulfillmentText: description + eventText});
  });
}
