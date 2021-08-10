export default function calcArrival({ aid, pace, distance, segmentTime, lastArrival }) {
  console.log(segmentTime)
  if (aid.location === "Start") {
    //sets start arrival time to start time or defaults to nothing if value is empty
    let startTime = document.getElementById('startTime').value;
    startTime = startTime[0] === "0" ? startTime.slice(1) : startTime;
    return aid.arrivalTime = determineStartTime(startTime);
  } else {
    //convert pace to minutes/mile
    let arrivalHour = parseInt(lastArrival.split(':')[0]) + parseInt(segmentTime.split(':')[0]);
    let arrivalMinute = parseInt(lastArrival.split(':')[1]) + parseInt(segmentTime.split(':')[1]);
    let amPm = arrivalHour >= 12 ? ' PM' : ' AM';
    arrivalHour = (arrivalHour % 12) || 12;
    let arrival = `${arrivalHour}:${arrivalMinute}` + amPm;
    if (arrivalMinute > 59) {
      let convertedHours = Math.floor(arrivalMinute / 60);
      //add hours from minutes
      const convertedMinutes = ((arrivalMinute / 60).toString().split(".")[1] / 100) * 60;
      console.log(convertedMinutes, arrivalMinute)
      //getting crazy high numbers sometimes.........whhhhhyyyy
      amPm = (arrivalHour + convertedHours) >= 12 ? ' PM' : ' AM';
      arrival = `${arrivalHour + convertedHours}:${convertedMinutes}` + amPm;
    }
    return aid.arrivalTime = arrival;
    //multiply that by distance
    //convert that to hours and minutes
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