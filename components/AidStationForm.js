export default function AidStationForm({ aidStations, setAidStations }) {
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
  };

  return (
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
  )
};