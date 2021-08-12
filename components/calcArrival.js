//TODO: bonus, get race distance as props and creat finish aid

export default function calcArrival({ aid, segmentTime, lastArrival }) {
  if (aid.location === "Start") {
    //sets start arrival time to start time or defaults to nothing if value is empty
    let startTime = document.getElementById('startTime').value;
    startTime = startTime[0] === "0" ? startTime.slice(1) : startTime;
    return aid.arrivalTime = determineStartTime(startTime);
  } else {
    //TODO: Time is off for finish...except it's right sometimes
    //adds segment time to last arrival time
    let arrivalHour = parseInt(lastArrival.split(':')[0]) + parseInt(segmentTime.split(':')[0]);
    let arrivalMinutes = parseInt(lastArrival.split(':')[1]) + parseInt(segmentTime.split(':')[1]);
    //set aid.arrivalTime to 24 hour time
    let aidArrivalTime =convert24PlusHours(arrivalHour, arrivalMinutes)
    //set 24 hr time to 12 hr time to display in table
    arrivalHour = arrivalHour > 24 ? arrivalHour - 24 : arrivalHour;
    //TODO: make amPm its own function
    let amPm = arrivalHour === 24 || arrivalHour <= 12 ? ' AM' : ' PM';
    let arrivalTweleveHour = (arrivalHour % 12) || 12;
    //TODO: end here
    arrivalMinutes = arrivalMinutes.toString().length === 1 && arrivalMinutes < 10 ? '0' + arrivalMinutes : arrivalMinutes;
    let arrival = `${arrivalTweleveHour}:${arrivalMinutes}` + amPm;
    if (arrivalMinutes > 59) {
      let convertedHours = Math.floor(arrivalMinutes / 60);
      let convertedMinutes = Math.round(((arrivalMinutes / 60).toFixed(2).split('.')[1] / 100) * 60);
      convertedMinutes = convertedMinutes.toString().length === 1 && convertedMinutes < 9 ? '0' + convertedMinutes : convertedMinutes;
      //problem is when it goes from 12 PM to 1 PM
      aidArrivalTime = `${arrivalHour + convertedHours}:${convertedMinutes}`;
      //TODO: add amPm function here
      amPm = (arrivalHour + convertedHours) === 24 || (arrivalHour + convertedHours) <= 12 ? ' AM' : ' PM'
      arrival = `${arrivalTweleveHour + convertedHours}:${convertedMinutes}` + amPm;
    } else {
      arrival;
    }
    aid.arrivalTime = aidArrivalTime;
    //added this line to assign time to aid object.  used to assign object above if block and in if block
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

  function convert24PlusHours(hours, minutes) {
    let time
    if (hours > 25) {
      time = `${hours - 24}:${minutes}`;
    } else {
      time = `${hours}:${minutes}`;
    }
    return time
  };
};