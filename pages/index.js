import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

//TODO: create race form with distance + elevation gain and loss
//add radio button for miles or km
//create form for nutrition requirements and expected time
//create list for aid stations with distance of each station. give option for crew and/or drop bag

//TODO: Generate total gain and loss ft/mile
//generate total nutrition needed
//generate distance between aid stations and calories that are needed between them
//give average pace to meet time goal

export default function Home() {
  const [totalDistance, setTotalDistance] = useState('');
  const [elevationGain, setElevationGain] = useState('');
  const [elevationLoss, setElevationLoss] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [calorieRate, setCalorieRate] = useState('');
  const [hydrationRate, setHydrationRate] = useState('');
  const [sodiumRate, setSodiumRate] = useState('');

  function handleSumbit(e) {
    e.preventDefault();
    //calculations happen here;
  }
  
  // include when backend is added
  // function clearForm() {
  //   setTotalDistance('');
  //   setElevationGain('');
  //   setElevationLoss('');
  //   setTimeEstimate('');
  //   setCalorieRate('');
  //   setHydrationRate('');
  //   setSodiumRate('');
  // }

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
        <p>Success Through Preparation</p>

        <div className={styles.raceInfo}>
          <form onSubmit={handleSumbit}>
            <div className="input">
            <label htmlFor="distance">Race distance (miles) : </label>
            <input
              required
              type="number"
              id="distance"
              name="distance"
              value={totalDistance}
              onChange={(e) => setTotalDistance(e.target.value)}
            />
            </div>
            <div className="input">
            <label htmlFor="elevationGain">Elevation Gain (ft) : </label>
            <input
              required
              type="number"
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
              id="elevationLoss"
              name="loss"
              value={elevationLoss}
              onChange={(e) => setElevationLoss(e.target.value)}
            />
            </div>
            <div className="input">
            <label htmlFor="timeEstimate">Time Goal (hr:min): </label>
            <input
              required
              type="text"
              id="timeEstimate"
              name="time"
              value={timeEstimate}
              onChange={(e) => setTimeEstimate(e.target.value)}
            />
            </div>
            <button type="submit">Go!</button>
          </form>
        </div>

      </main>


    </div>
  )
}
