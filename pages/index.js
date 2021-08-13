import Head from 'next/head'
import { useState } from 'react'

import AidStationRow from '../components/AidStationRow';

export default function Home() {
  //change state when ready to ship
  const [totalDistance, setTotalDistance] = useState(100);
  const [distanceType, setDistanceType] = useState('miles');
  const [elevationGain, setElevationGain] = useState('18000');
  const [elevationLoss, setElevationLoss] = useState('18000');
  const [timeEstimate, setTimeEstimate] = useState('18:30');
  const [calorieRate, setCalorieRate] = useState(250);
  const [hydrationRate, setHydrationRate] = useState(750);
  const [sodiumRate, setSodiumRate] = useState(500);
  const [aidStations, setAidStations] = useState([{
    location: "Start",
    distance: 0,
    segmentTime: "",
    arrivalTime: "",
  }]);
  const [plan, setPlan] = useState({
    ascent: "",
    descent: "",
    pace: "",
    calories: "",
    liquid: "",
    sodium: ""
  })

  function handleRaceInfoSubmit(e) {
    e.preventDefault();
    const racePlan = {};
    let distance = totalDistance
    if (distanceType === "kilometers") {
      distance = ((totalDistance * .621371).toFixed(2));
    }
    racePlan.ascent = Math.round((elevationGain / distance));
    racePlan.descent = Math.round((elevationLoss / distance));
    const timeInMinutes = (parseInt(timeEstimate.split(':')[0]) * 60) + (parseInt(timeEstimate.split(':')[1]));
    let pace = (timeInMinutes / distance).toFixed(2);
    racePlan.pace = convertPace(pace)
    racePlan.calories = Math.round(calorieRate * (timeInMinutes / 60));
    racePlan.liquid = (hydrationRate * (timeInMinutes / 60) / 1000).toFixed(1);
    racePlan.sodium = Math.round(sodiumRate * (timeInMinutes / 60));
    setPlan(racePlan)
  }

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
  }

  function handleAidStationSubmit(e) {
    e.preventDefault();
    const newAidStation = {}
    newAidStation.location = document.getElementById('location').value;
    newAidStation.distance = document.getElementById('aid-distance').value;
    newAidStation.cutoff = document.getElementById('cutoff').value;
    newAidStation.cutoff = newAidStation.cutoff.length === 2 ? "" : newAidStation.cutoff;
    newAidStation.crew = document.getElementById('crew').checked ? " X " : " - ";
    newAidStation.pacer = document.getElementById('pacer').checked ? " X " : " - ";
    newAidStation.dropBag = document.getElementById('drop-bag').checked ? " X " : " - ";
    newAidStation.waterOnly = document.getElementById('water-only').checked ? " X " : " - ";
    newAidStation.comments = document.getElementById('comments').value;
    const updatedAidStations = [...aidStations, newAidStation];
    setAidStations(updatedAidStations)
  }

  return (
    <div>
      <Head>
        <title>Ultra Planner</title>
        <meta name="application-name" content="Ultra Planner" />
        <meta name="description" content="Ultramarathon race planner" />
        <meta name="keywords" content="Ultramarathon, race planner, ultra,planner, trail running, trail" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <h1>Ultra Planner</h1>

          <form className="race-info default-text" onSubmit={handleRaceInfoSubmit}>
            <div className="distance">
              <div className="input">
                <label htmlFor="distance">Race distance : </label>
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
        
          <div className="race-plan default-text">
            <p><span className="race-plan-bold">Elevation gain per mile:</span> {plan.ascent} ft</p>
            <p><span className="race-plan-bold">Elevation loss per mile:</span> {plan.descent} ft</p>
            <p><span className="race-plan-bold">Average Pace:</span> {plan.pace} min/mile</p>
            <p><span className="race-plan-bold">Total Calories:</span> {plan.calories} calories</p>
            <p><span className="race-plan-bold">Total Liquid:</span> {plan.liquid} L</p>
            <p><span className="race-plan-bold">Total Sodium:</span> {plan.sodium} mg</p>
          </div>
      
        <form className="aid-station-form default-text" onSubmit={handleAidStationSubmit}>
          <label htmlFor="location">Station Name: </label>
          <input
            required
            id="location"
            type="string"
            name="location"
          />
          <div>
          <label htmlFor="aid-distance">Distance: </label>
          <input
            required
            id="aid-distance"
            type="number"
            min="0"
            step="0.01"
            name="aid-distance"
            />
          </div>
          <div>
            <label htmlFor="cutoff">Cuttoff Time (optional): </label>
            <input
              id="cutoff"
              type="time"
              name="cutoff"
             />
            </div>
          <p>Check all that apply:  </p>
          <input
            id="crew"
            type="checkbox"
            name="crew"
            value="true"
          />
          <label htmlFor="crew">Crew </label>
          <input
            id="pacer"
            type="checkbox"
            name="pacer"
            value="true"
          />
          <label htmlFor="pacer">Pacer </label>
          <input
            id="drop-bag"
            type="checkbox"
            name="dropBag"
            value="true"
          />
          <label htmlFor="drop-bag">Drop Bag </label>
          <input
            id="water-only"
            type="checkbox"
            name="waterOnly"
            value="true"
          />
          <label htmlFor="water-only">Water Only </label>
          <div>
          <label htmlFor="comments">Comments</label>
          </div>
          <textarea
            id="comments"
            cols="40"
            rows="4"
            name="comments"
          />
          

          <button type="submit">Add</button>
        </form>

        <table className="default-text">
          <thead>
            <tr>
              <th>Location</th>
              <th>Distance</th>
              <th>Segment Distance</th>
              <th>Segment Time (hr:min)</th>
              <th>Expected Arrival</th>
              <th>Cuttoff Time</th>
              <th>Calories/Segment</th>
              <th>Liquid/Segment</th>
              <th>Sodium/Segment</th>
              <th>Crew Access</th>
              <th>Pacer</th>
              <th>Drop Bag</th>
              <th>Water Only</th>
              <th>Comments</th>
            </tr>
         </thead>
          <tbody>
            {aidStations.map((aid, index) => <AidStationRow
              key={aid.location + index}
              aid={aid}
              index={index}
              aidStations={aidStations}
              pace={plan.pace}
              calorieRate={calorieRate}
              hydrationRate={hydrationRate}
              sodiumRate={sodiumRate}
            />)}
          </tbody>
      </table>

      </main>

    </div>
  )
}
