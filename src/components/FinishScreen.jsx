/* eslint-disable react/prop-types */
export default function FinishScreen({
  points,
  maxPoints,
  highscore,
  dispatch,
}) {
  const percentage = Math.round((points / maxPoints) * 100);

  return (
    <div className="result">
      <p>Thanks for playing!</p>
      <p>
        Final score: {points} out of {maxPoints} it is {percentage}%
      </p>
      <p>({highscore})</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Play again
      </button>
    </div>
  );
}
