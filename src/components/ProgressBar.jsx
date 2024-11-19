/* eslint-disable react/prop-types */
function ProgressBar({ current, max }) {
  return (
    <div className="progress-bar">
      <div
        className="progress-value"
        style={{ width: `${(current / max) * 100}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
