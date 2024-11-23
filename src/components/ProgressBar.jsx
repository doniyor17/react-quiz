import { useQuiz } from "../context/QuizContext";

function ProgressBar() {
  const { index: current, numQuestions: max } = useQuiz();
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
