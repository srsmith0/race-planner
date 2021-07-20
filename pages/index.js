import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

//TODO: create race form with distance + elevation gain and loss
//create form for nutrition requirements and expected time
//create list for aid stations with distance of each station. give option for crew and/or drop bag

//TODO: Generate total gain and loss ft/mile
//generate total nutrition needed
//generate distance between aid stations and calories that are needed between them
//give average pace to meet time goal

export default function Home() {
  const [totalDistance, setTotalDistance] = useState('');

  return (
    <div className={styles.container}>
      <Head>
        <title>Ultra Planner</title>
        <meta name="application-name" content="Ultra Planner" />
        <meta name="description" content="Ultramarathon race planner" />
        <meta name="keywords" content="Ultramarathon, race planner, ultra,planner, trail running, trail" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Ultra Planner</h1>

      </main>


    </div>
  )
}
