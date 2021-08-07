
export default function calcArrival({ aid, pace }) {
        if (aid.location === "Start") {
        return aid.segmentTime = document.getElementById('startTime').value;
      } else {
        //convert pace to minutes/mile
        const movingTime = aid.segmentDistance * (parseInt(pace.split(':')[0]) * 60) + aid.segmentDistance * (parseInt(pace.split(':')[1]));
        //multiply that by distance
        //convert that to hours and minutes
        return aid.segmentTime = movingTime
      }
}