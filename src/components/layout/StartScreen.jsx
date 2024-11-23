import { useQuiz } from "../../context/QuizContext";

function StartScreen() {
  const { numQuestions: num, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2 className="">Welcome to the React Quiz App!</h2>
      <h3 className="">{num} questions to test your React skills</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        {"Let's start"}
      </button>
    </div>
  );
}

export default StartScreen;
