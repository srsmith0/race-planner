
export default function RaceInfoForm({
  totalDistance, setTotalDistance, distanceType, setDistanceType,
  elevationGain, setElevationGain, elevationLoss, setElevationLoss,
  timeEstimate, setTimeEstimate, calorieRate, setCalorieRate,
  hydrationRate, setHydrationRate, sodiumRate, setSodiumRate, setPlan
}) {

  function handleRaceInfoSubmit(e) {
    e.preventDefault();
    const racePlan = {};
      let distance = totalDistance;
    if (distanceType === "kilometers") {
      distance = ((totalDistance * .621371).toFixed(2));
    }
    racePlan.ascent = Math.round((elevationGain / distance));
    racePlan.descent = Math.round((elevationLoss / distance));
    const timeInMinutes = (parseInt(timeEstimate.split(':')[0]) * 60) + (parseInt(timeEstimate.split(':')[1]));
    let pace = (timeInMinutes / distance).toFixed(2);
    racePlan.pace = convertPace(pace);
    racePlan.calories = Math.round(calorieRate * (timeInMinutes / 60));
    racePlan.liquid = (hydrationRate * (timeInMinutes / 60) / 1000).toFixed(1);
    racePlan.sodium = Math.round(sodiumRate * (timeInMinutes / 60));
    setPlan(racePlan);
  };

    function convertPace(pace) {
    const firstDigitPace = pace.toString().split('.')[0];
    const secondDigitPace = "." + pace.toString().split('.')[1];
    let modifiedSecondDigitPace = (parseInt(Math.ceil(secondDigitPace * 60)).toString());
    if (secondDigitPace === ".00") {
      modifiedSecondDigitPace = "00";
    } else if (modifiedSecondDigitPace.length === 1) {
      modifiedSecondDigitPace = "0" + (parseInt(Math.floor(secondDigitPace * 60)).toString());
    }
    return firstDigitPace + ':' + modifiedSecondDigitPace;
  };

  return (
    <form className="race-info default-text" onSubmit={handleRaceInfoSubmit}>
      <div className="distance">
        <div className="input">
          <label htmlFor="distance">Race distance: </label>
          <input
            required
            type="number"
            min="0"
            id="distance"
            name="distance"
            value={totalDistance}
            onChange={(e) => setTotalDistance(e.target.value)}
        />
          <input
            required
            checked
            className="distance"
            type="radio"
            id="miles"
            name="distance"
            value={distanceType}
            onChange={() => setDistanceType('miles')}
          />
          <label htmlFor="miles"> Miles</label>
          <input
            className="distance"
            type="radio"
            id="kilometers"
            name="distance"
            value={distanceType}
            onChange={() => setDistanceType('kilometers')}
          />
          <label htmlFor="kilometers">Kilometers</label>
        </div>
          <label htmlFor="startTime">Start Time: </label>
          <input
            required
            type="time"
            id="startTime"
            name="startTime"
          />
        <div className="input">
          <label htmlFor="elevationGain">Elevation Gain (ft) : </label>
          <input
            required
            type="number"
            min="0"
            id="elevationGain"
            name="gain"
            value={elevationGain}
            onChange={(e) => setElevationGain(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="elevationLoss">Elevation Loss (ft) : </label>
          <input
            required
            type="number"
            min="0"
            id="elevationLoss"
            name="loss"
            value={elevationLoss}
            onChange={(e) => setElevationLoss(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="timeEstimate">Time Goal (hr:min) : </label>
          <input
            required
            type="text"
            id="timeEstimate"
            name="time"
            pattern="[0-9]+:[0-5]+[0-9]+$"
            maxLength="5"
            placeholder="00:00"
            value={timeEstimate}
            onChange={(e) => setTimeEstimate(e.target.value)}
          />
        </div>
      </div>
      <div className="nutrition">
        <div className="input">
        <label htmlFor="calories">Calorie Intake Rate (cal/hr) : </label>
        <input
        required
        type="number"
        id="calories"
        min="0"  
        name="calories"
        value={calorieRate}
        onChange={(e) => setCalorieRate(e.target.value)}
        />
        </div>
      <div className="input">
        <label htmlFor="hydration">Fluid Intake Rate (mL/hr) : </label>
        <input
        required
        type="number"
        min="0"  
        id="hydration"
        name="hydration"
        value={hydrationRate}
        onChange={(e) => setHydrationRate(e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="sodium">Sodium Intake Rate (mg/hr) : </label>
        <input
        required
        type="number"
        min="0"
        id="sodium"
        name="sodium"
        value={sodiumRate}
        onChange={(e) => setSodiumRate(e.target.value)}
        />
      </div>  
      </div>
      <button type="submit">Calculate</button>

    </form>
  )
};