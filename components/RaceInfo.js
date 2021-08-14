export default function RaceInfo({ plan }) {

  return (
    <div className="race-plan default-text">
      <p><span className="race-plan-bold">Elevation gain per mile:</span> {plan.ascent} ft</p>
      <p><span className="race-plan-bold">Elevation loss per mile:</span> {plan.descent} ft</p>
      <p><span className="race-plan-bold">Average Pace:</span> {plan.pace} min/mile</p>
      <p><span className="race-plan-bold">Total Calories:</span> {plan.calories} calories</p>
      <p><span className="race-plan-bold">Total Liquid:</span> {plan.liquid} L</p>
      <p><span className="race-plan-bold">Total Sodium:</span> {plan.sodium} mg</p>
    </div>
  )
  };