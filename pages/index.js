import Head from 'next/head'
import { useState } from 'react'

import RaceInfoForm from '../components/RaceInfoForm';
import AidStationForm from '../components/AidStationForm';
import RaceInfo from '../components/RaceInfo';
import AidStationTable from '../components/AidStationTable';

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
    distance: "",
    distanceType: "miles",
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

        <RaceInfo plan={plan} />
      
        <AidStationForm
          aidStations={aidStations}
          setAidStations={setAidStations}
        />

        <AidStationTable
          aidStations={aidStations}
          plan={plan}
          calorieRate={calorieRate}
          hydrationRate={hydrationRate}
          sodiumRate={sodiumRate}
        />

      </main>

    </div>
  );
};
