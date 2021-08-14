import dynamic from 'next/dynamic'

const DynamicAidArrivalTime = dynamic(
  () => import('../utils/AidArrivalTime'),
  { ssr: false }
);


//TODO: if negative numbers, return 0s
export default function createAidTableRow({
  aid, index, aidStations, pace, calorieRate, hydrationRate, sodiumRate
}) {
    //sets aid segment distance
  aid.location === "Start" ? aid.segmentDistance = 0 : aid.segmentDistance = parseFloat(aid.distance - aidStations[index - 1].distance).toFixed(2);
  //if no float, converts distance to integer
  aid.segmentDistance = aid.segmentDistance.toString().split('.')[1] === "00" ? aid.segmentDistance.split('.')[0] : aid.segmentDistance;
  const getSegmentTime = () => {
    if (aid.location === "Start" || pace === "") {
      return ""
    } else {
      //splits pace to minutes and seconds to convert to time
      const time = getPaceToMinutes(pace);
      getNutritionFactor(time)
      return aid.segmentTime = time;
    };
  };

    function getPaceToMinutes(pace) {
      //separate minutes from seconds from pace
      const minutes = pace.split(':')[0];
      const seconds = pace.split(':')[1];
      //uses segment distance and pace minutes/seconds to calculate time
      let totalMinutes = aid.segmentDistance * minutes;
      const totalSeconds = aid.segmentDistance * seconds;
      //convert seconds to minutes
      const convertedSeconds = totalSeconds.toFixed(2) / 60;
      if (totalSeconds <= 59) {
        //seconds are less than a minute => return with 1 minute added
        totalMinutes++;
      } else {
        totalMinutes = totalMinutes + Math.round(convertedSeconds);
      };

      function formatTotalMinutes(minutes) {
        if (minutes < 10) {
          return '0' + totalMinutes;
        } else if (minutes.toString().length === 1) {
          return totalMinutes + '0';
        } else {
          //has to round to avoid long decimals in time output for aid station '0.00' format
          return Math.round(totalMinutes)
        };
      };

      let convertedTime = (totalMinutes / 60).toFixed(1).toString();
      //this used to be in the return line.  Made variables so I can create if block
      let convertedHours = convertedTime.split('.')[0];
      let convertedMinutes = Math.round(convertedTime.split('.')[1] * 6);
      if (parseInt(convertedMinutes) < 9) {
        convertedMinutes = '0' + convertedMinutes;
      } else if (convertedMinutes.length === 1) {
        convertedMinutes = convertedMinutes + '0';
      } else {
        convertedMinutes
      };
      
      return totalMinutes / 60 <= 1 ? `00:${formatTotalMinutes(totalMinutes)}` : `${convertedHours}:${convertedMinutes}`
    };

    function getNutritionFactor(time) {
      if (time === "") {
        return 0
      } else {
        let number = time.toString().split(':')[0];
        let minutes = time.toString().split(':')[1];
        let convertedMinutes = (minutes / 60).toFixed(2);
        return parseInt(number) + parseFloat(convertedMinutes);
      };
    };
    
    getSegmentTime()
    return (
      <tr key={index + aid.location}>
        <td>{aid.location}</td>
        <td>{aid.distance}</td>
        <td>{aid.segmentDistance}</td>
        <td>{aid.segmentTime}</td>
        <td><DynamicAidArrivalTime
          pace={pace}
          aid={aid}
          segmentTime={aid.segmentTime}
          lastArrival={index === 0 ? "" : aidStations[index - 1].arrivalTime}
        />
        </td>
        <td>{aid.cutoff}</td>
        <td>{Math.round(getNutritionFactor(aid.segmentTime) * calorieRate)} cal</td>
        <td>{Math.round(getNutritionFactor(aid.segmentTime) * hydrationRate)} mL</td>
        <td>{Math.round(getNutritionFactor(aid.segmentTime) * sodiumRate)} mg</td>
        <td>{aid.crew}</td>
        <td>{aid.pacer}</td>
        <td>{aid.dropBag}</td>
        <td>{aid.waterOnly}</td>
        <td className="comments">{aid.comments}</td>
      </tr>
    )
  }