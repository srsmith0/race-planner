import Head from 'next/head'
import { useState } from 'react'

import AidStationRow from '../components/AidStationRow';
import RaceInfoForm from '../components/RaceInfoForm';

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
  });

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
    setAidStations(updatedAidStations);
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

        <RaceInfoForm
          totalDistance={totalDistance}
          setTotalDistance={setTotalDistance}
          distanceType={distanceType}
          setDistanceType={setDistanceType}
          elevationGain={elevationGain}
          elevationLoss={elevationLoss}
          setElevationLoss={setElevationLoss}
          timeEstimate={timeEstimate}
          setTimeEstimate={setTimeEstimate}
          calorieRate={calorieRate}
          setCalorieRate={setCalorieRate}
          hydrationRate={hydrationRate}
          setHydrationRate={setHydrationRate}
          sodiumRate={sodiumRate}
          setSodiumRate={setSodiumRate}
          setPlan={setPlan}
        />

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
