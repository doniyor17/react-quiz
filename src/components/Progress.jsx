import { useQuiz } from "../context/QuizContext";
import ProgressBar from "./ProgressBar";
function Progress() {
  const { index, points, numQuestions, maxPoints } = useQuiz();
  return (
    <header className="progress">
      <ProgressBar />
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
