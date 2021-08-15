export default function calcArrival({ aid, segmentTime, lastArrival }) {
  if (aid.location === "Start") {
    //sets start arrival time to start time or defaults to nothing if value is empty
    let startTime = document.getElementById('startTime').value;
    startTime = startTime[0] === "0" ? startTime.slice(1) : startTime;
    return aid.arrivalTime = determineStartTime(startTime);
  } else {
    //adds segment time to last arrival time
    let arrivalHour = parseInt(lastArrival.split(':')[0]) + parseInt(segmentTime.split(':')[0]);
    let arrivalMinutes = Math.round(parseInt(lastArrival.split(':')[1]) + parseInt(segmentTime.split(':')[1]));
    //set aid.arrivalTime to 24 hour time
    //set 24 hr time to 12 hr time to display in table
    let aidArrivalTime = determineHourIncrease(arrivalHour, arrivalMinutes);
    aidArrivalTime = convert24PlusHours(aidArrivalTime);
    arrivalHour = arrivalHour > 24 ? arrivalHour - 24 : arrivalHour;
    let amPm = arrivalHour === 24 || arrivalHour < 12 ? ' AM' : ' PM';
    let arrivalTweleveHour = (arrivalHour % 12) || 12;
    //formats minutes to display correctly
    arrivalMinutes = arrivalMinutes.toString().length === 1 && arrivalMinutes < 10 ? '0' + arrivalMinutes : arrivalMinutes;
    let arrival = `${arrivalTweleveHour}:${arrivalMinutes}` + amPm;
    if (arrivalMinutes > 59) {
      let convertedHours = Math.floor(arrivalMinutes / 60);
      let convertedMinutes = Math.round(((arrivalMinutes / 60).toFixed(2).split('.')[1] / 100) * 60);
      convertedMinutes = convertedMinutes.toString().length === 1 && convertedMinutes < 10 ? '0' + convertedMinutes : convertedMinutes;
      aidArrivalTime = `${arrivalHour + convertedHours}:${convertedMinutes}`;
      amPm = (arrivalHour + convertedHours) === 24 || (arrivalHour + convertedHours) <= 12 ? ' AM' : ' PM';
      //converts to 12 hour if hour is > 12
      arrivalTweleveHour = (arrivalTweleveHour + convertedHours) % 12 || 12;
      arrival = `${arrivalTweleveHour}:${convertedMinutes}` + amPm;
    } else {
      arrival;
    };

    aid.arrivalTime = aidArrivalTime;
    return arrival;
  };

  function determineStartTime(time) {
    if (time === "") {
      return time;
    } else {
      let hours = parseInt(time.split(':')[0]);
      let amPm = hours >= 12 ? ' PM' : ' AM';
      hours = (hours % 12) || 12;
      return `${hours}:${time.split(':')[1]}` + amPm;
    }
  };
  function determineHourIncrease(arrivalHour, arrivalMinutes) {
    let aidArrivalTime;
    if (arrivalMinutes > 59) {
      let convertedMinutesToHours = Math.floor(arrivalMinutes / 60);
      arrivalMinutes = Math.round(((arrivalMinutes / 60).toFixed(2).split('.')[1] / 100) * 60);
      arrivalMinutes = arrivalMinutes.toString().length === 1 && arrivalMinutes < 9 ? '0' + arrivalMinutes : arrivalMinutes;
      return `${arrivalHour + convertedMinutesToHours}:${arrivalMinutes}`;
    } else {
      return `${arrivalHour}:${arrivalMinutes}`;
    };
  };

  function convert24PlusHours(time) {
    let hours = time.split(':')[0];
    let minutes = time.split(':')[1];
    let convertedTime
    if (hours > 25) {
      convertedTime = `${hours - 24}:${minutes}`;
    } else {
      convertedTime = time;
    }
    return convertedTime;
  };
};