import moment from "moment";

export default function calcArrival({ aid, pace, distance, segmentTime, lastArrival }) {
  if (aid.location === "Start") {
    //sets start arrival time to start time or defaults to nothing if value is empty
    return aid.arrivalTime = document.getElementById('startTime').value || " ";
  } else {
    //convert pace to minutes/mile
    const arrival = segmentTime + lastArrival;
    //multiply that by distance
    //convert that to hours and minutes
    return aid.arrivalTime = arrival
  }
}

    
    //  CONVERT 24 HOUR TIME TO 12 HOUR TIME
    //     var dt = new Date();
    // var hours = dt.getHours() ; // gives the value in 24 hours format
    // var AmOrPm = hours >= 12 ? 'pm' : 'am';
    // hours = (hours % 12) || 12;
    // var minutes = dt.getMinutes() ;
    // var finalTime = "Time  - " + hours + ":" + minutes + " " + AmOrPm; 
    //     finalTime // final time Time - 22:10