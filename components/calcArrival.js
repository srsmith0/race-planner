export default function calcArrival({ aid, pace, distance, segmentTime, lastArrival }) {
  if (aid.location === "Start") {
    //sets start arrival time to start time or defaults to nothing if value is empty
    let startTime = document.getElementById('startTime').value;
    startTime = startTime[0] === "0" ? startTime.slice(1) : startTime;
    return aid.arrivalTime = determineStartTime(startTime);
  } else {
    //TODO: put in logic that rests to 00:00 at 24 hours
    //convert pace to minutes/mile
    let arrivalHour = parseInt(lastArrival.split(':')[0]) + parseInt(segmentTime.split(':')[0]);
    let arrivalMinutes = parseInt(lastArrival.split(':')[1]) + parseInt(segmentTime.split(':')[1]);
    //set aid.arrivalTime to 24 hour time
    aid.arrivalTime = `${arrivalHour}:${arrivalMinutes}`;
    //set 24 hr time to 12 hr time to display in table
    let amPm = arrivalHour >= 12 ? ' PM' : ' AM';
    let arrivalTweleveHour = (arrivalHour % 12) || 12;
    let arrival = `${arrivalTweleveHour}:${arrivalMinutes}` + amPm;
    if (arrivalMinutes > 59) {
      let convertedHours = Math.floor(arrivalMinutes / 60);
      let convertedMinutes = Math.round(((arrivalMinutes / 60).toFixed(2).split('.')[1] / 100) * 60);
      convertedMinutes = convertedMinutes.toString().length === 1 ? convertedMinutes + '0' : convertedMinutes;
      //problem is when it goes from 12 PM to 1 PM
      aid.arrivalTime = `${arrivalHour + convertedHours}:${convertedMinutes}`;
      arrival = `${arrivalTweleveHour + convertedHours}:${convertedMinutes}` + amPm;
    } else {
      arrival;
    }
    return arrival;
  };

  function determineStartTime(time) {
    if (time === "") {
      return time;
    } else {
      let hours = parseInt(time.split(':')[0])
      let amPm = hours >= 12 ? ' PM' : ' AM';
      hours = (hours % 12) || 12;
      return `${hours}:${time.split(':')[1]}` + amPm
    }
  }
};