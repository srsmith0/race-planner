export default function calcArrival({ aid, pace, distance, segmentTime, lastArrival }) {
  if (aid.location === "Start") {
    //sets start arrival time to start time or defaults to nothing if value is empty
    let startTime = document.getElementById('startTime').value;
    startTime = startTime[0] === "0" ? startTime.slice(1) : startTime;
    return aid.arrivalTime = `${determineAmPm(startTime)}`;
  } else {
    //convert pace to minutes/mile
    let arrivalHour = parseInt(lastArrival.split(':')[0]) + parseInt(segmentTime.split(':')[0]);
    let arrivalMinute = parseInt(lastArrival.split(':')[1]) + parseInt(segmentTime.split(':')[1]);
    let arrival
    if (arrivalMinute > 59) {
      console.log('greater than 59')
      const convertedHours = Math.floor(arrivalMinute / 60);
      const convertedMinutes = (arrivalMinute / 60).toString().split('.')[1] * 6;
      console.log(arrivalHour, convertedHours)
      return arrival = `${arrivalHour + convertedHours}:${convertedMinutes}`
    }
    arrival = `${arrivalHour}:${arrivalMinute}`;
    //multiply that by distance
    //convert that to hours and minutes
    return aid.arrivalTime = arrival
  }

  function determineAmPm(time) {
    let hours = parseInt(time.split(':')[0])
    let amPm = hours >= 12 ? ' PM' : ' AM';
    hours = (hours % 12) || 12;
    return `${hours}:${time.split(':')[1]}${amPm}`
  }
}
// function padLeadingZeros(num, size) {
//     var s = num+"";
//     while (s.length < size) s = "0" + s;
//     return s;
// }
// padLeadingZeros(57, 3);// "057"
// padLeadingZeros(57, 4); //"0057"

    
    //  CONVERT 24 HOUR TIME TO 12 HOUR TIME
    //     var dt = new Date();
    // var hours = dt.getHours() ; // gives the value in 24 hours format
    // var AmOrPm = hours >= 12 ? 'pm' : 'am';
    // hours = (hours % 12) || 12;
    // var minutes = dt.getMinutes() ;
    // var finalTime = "Time  - " + hours + ":" + minutes + " " + AmOrPm; 
    //     finalTime // final time Time - 22:10