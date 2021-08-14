import Head from 'next/head'
import { useState } from 'react'
import AidStationForm from '../components/AidStationForm';

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
      
        <AidStationForm
          aidStations={aidStations}
          setAidStations={setAidStations}
        />

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
