/* eslint-disable react/prop-types */
import ProgressBar from "./ProgressBar";
function Progress({ index, numQuestions, points, maxPoints }) {
  return (
    <header className="progress">
      <ProgressBar
        current={index}
        max={numQuestions}
      />
      <p>
        Question: <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        Score: <strong>{points}</strong>/{maxPoints}
      </p>
    </header>
  );
}

export default Progress;
