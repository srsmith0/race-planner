import AidStationRow from './AidStationRow'

export default function AidStationTable({ aidStations, plan, calorieRate, hydrationRate, sodiumRate }) {

  return (
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
  )
};