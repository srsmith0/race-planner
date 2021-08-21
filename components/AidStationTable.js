import AidStationRow from './AidStationRow'
import 'table2excel'

export default function AidStationTable({
  aidStations, plan, calorieRate, hydrationRate, sodiumRate
}) {
  //sorts aid station by distance in case user forgets to add earlier aid station
  function ascendingDistance(aidOne, aidTwo) {
  return aidOne.distance - aidTwo.distance;
  };

  function exportTable() {
    const Table2Excel = window.Table2Excel;
    const table2excel = new Table2Excel()
    return table2excel.export(document.querySelectorAll('table'), 'aid-table')
  }

  return (
    <>
    <table id="aid-table" className="default-text">
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
        {aidStations.sort(ascendingDistance).map((aid, index) => <AidStationRow
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
      <button onClick={() => exportTable()}>Export Table to Excel (.xlsx)</button>
    </>
  );
};