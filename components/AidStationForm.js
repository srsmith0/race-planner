export default function AidStationForm({ aidStations, setAidStations, distance }) {
  function handleAidStationSubmit(e) {
    e.preventDefault();
    if (!distance) {
      alert('Please enter race information.')
    } else {
      const newAidStation = {}
      newAidStation.location = document.getElementById('location').value;
      newAidStation.distance = document.getElementById('aid-distance').value;
      newAidStation.cutoff = convert24Hours(document.getElementById('cutoff').value);
      newAidStation.crew = document.getElementById('crew').checked ? " X " : " - ";
      newAidStation.pacer = document.getElementById('pacer').checked ? " X " : " - ";
      newAidStation.dropBag = document.getElementById('drop-bag').checked ? " X " : " - ";
      newAidStation.waterOnly = document.getElementById('water-only').checked ? " X " : " - ";
      newAidStation.comments = document.getElementById('comments').value;
      const updatedAidStations = [...aidStations, newAidStation];
      // const sortedUpdatedAidStations = updatedAidStations.sort(aidStationByDistance);
      setAidStations(updatedAidStations);
      };
      document.getElementById("aid-form").reset();
  };

  function convert24Hours(time) {
    let hour = parseInt(time.split(':')[0]);
    let minutes = time.split(':')[1];
    let convertedTime;
    if (time === "") {
      convertedTime = ""
    } else {
      let amPm = hour === 24 || hour < 12 ? ' AM' : ' PM';
      let tweleveHour = (hour % 12) || 12;
      convertedTime = `${tweleveHour}:${minutes} ${amPm}`;
      console.log(convertedTime)
    };
    return convertedTime;
  };

  // function aidStationByDistance(aidA, aidB) {
  //   const distanceA = aidA.distance;
  //   const distanceB = aidB.distance;

  // 	let comparison = 0;
	// 	if (distanceA > distanceB) {
	// 		comparison = -1;
	// 	} else if (distanceA < distanceB) {
	// 		comparison = 1;
  //   };
	// 	return comparison;
  // };

  return (
    <form id="aid-form" className="aid-station-form default-text" onSubmit={handleAidStationSubmit}>
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
  );
};