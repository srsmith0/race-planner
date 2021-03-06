import Head from 'next/head'
import { useState } from 'react'
import dynamic from 'next/dynamic'

import RaceInfoForm from '../components/RaceInfoForm';
import AidStationForm from '../components/AidStationForm';
import RaceInfo from '../components/RaceInfo';

const DynamicAidStationTable = dynamic(
  () => import('../components/AidStationTable'),
  { ssr: false }
);

export default function Home() {
  const [totalDistance, setTotalDistance] = useState("");
  const [distanceType, setDistanceType] = useState('miles');
  const [elevationGain, setElevationGain] = useState("");
  const [elevationLoss, setElevationLoss] = useState("");
  const [timeEstimate, setTimeEstimate] = useState("");
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
        <link rel="icon" href="https://img.icons8.com/officel/16/000000/running.png" />
      </Head>

      <main>
        <h1>The Ultra Planner</h1>
        <div className="description default-text">
          <p>
            This is a tool that will help speed up the process of making race day spreadsheets.  You just need to add the race distance,
            elevation gain/loss, your time goal, and your ideal nutrition intake.  There are default values for nutrition if you are unsure.
            This will generate the elevation gain/loss per mile, the average pace to achieve the time goal, and total nutrition
            needed for race day.
          </p>
          <p>
            There is an aid station table below the race day information where you can add aid stations.  That table will
            tell you the segment length, duration, expected arrival, and nutrition for the segment.  There are also options for cutoff times,
            crew access, pacer access, drop bags, if it is water only, and room for general comments.  Once all the aid stations are added, you can
            save the table as an .xlsx file to open in Excel to save and edit.  Please share if you find it helpful!
          </p>
        </div>
          
        <RaceInfoForm
          totalDistance={totalDistance}
          setTotalDistance={setTotalDistance}
          distanceType={distanceType}
          setDistanceType={setDistanceType}
          elevationGain={elevationGain}
          setElevationGain={setElevationGain}
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
          distance={plan.distance}
        />

        <DynamicAidStationTable
          aidStations={aidStations}
          plan={plan}
          calorieRate={calorieRate}
          hydrationRate={hydrationRate}
          sodiumRate={sodiumRate}
        />
      <p className="default-text created">Created by Shawn Smith</p>
      </main>

    </div>
  );
};
