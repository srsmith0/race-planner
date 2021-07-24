import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

//TODO:
//add radio button for miles or km
//create list for aid stations with distance of each station. give option for crew and/or drop bag

//TODO: 
//generate distance between aid stations and calories that are needed between them
//fix pace output so it is in correct format

export default function Home() {
  const [totalDistance, setTotalDistance] = useState('');
  const [elevationGain, setElevationGain] = useState('');
  const [elevationLoss, setElevationLoss] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [calorieRate, setCalorieRate] = useState(250);
  const [hydrationRate, setHydrationRate] = useState(500);
  const [sodiumRate, setSodiumRate] = useState(700);
  const [plan, setPlan] = useState({
    ascent: null,
    descent: null,
    pace: null,
    calories: null,
    liquid: null,
    sodium: null
  })

  function handleSumbit(e) {
    e.preventDefault();
    const racePlan = {};
    racePlan.ascent = Math.round((elevationGain / totalDistance));
    racePlan.descent = Math.round((elevationLoss / totalDistance));
    const timeInMinutes = (parseInt(timeEstimate.split(':')[0]) * 60) + (parseInt(timeEstimate.split(':')[1]));
    let pace = (timeInMinutes / totalDistance).toFixed(2);
    const firstDigitPace = pace.toString().split('.')[0];
    const secondDigitPace = "." + pace.toString().split('.')[1];
    console.log(secondDigitPace)
    const modifiedSecondDigitPace = (Math.ceil(secondDigitPace * 60)).toString();
    racePlan.pace = firstDigitPace + ':' + modifiedSecondDigitPace;
    racePlan.calories = Math.round(calorieRate * (timeInMinutes/60));
    racePlan.liquid = (hydrationRate * (timeInMinutes/60) / 1000).toFixed(1);
    racePlan.sodium = Math.round(sodiumRate * (timeInMinutes/60));
    setPlan(racePlan)
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
        <div className="banner">
          <h1>Ultra Planner</h1>
          <p>Success Through Preparation</p>
        </div>

        <div className="race-info">
          <form onSubmit={handleSumbit}>
            <div className="distance">
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
            <label htmlFor="timeEstimate">Time Goal (hr:min) : </label>
            <input
              required
              type="text"
              id="timeEstimate"
              name="time"
              pattern="[0-9]+:[0-5]+[0-9]+$"
              maxLength="5"
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
              id="sodium"
              name="sodium"
              value={sodiumRate}
              onChange={(e) => setSodiumRate(e.target.value)}
              />
            </div>  
            </div>
            <button type="submit">Go!</button>
          </form>
          <div className="race-plan">
            <p>Elevation gain per mile: {plan.ascent} ft</p>
            <p>Elevation loss per mile: {plan.descent} ft</p>
            <p>Average Pace: {plan.pace} min/mile</p>
            <p>Total Calories: {plan.calories} calories</p>
            <p>Total Liquid: {plan.liquid} L</p>
            <p>Total Sodium: {plan.sodium} mg</p>
          </div>
        </div>

      </main>


    </div>
  )
}
