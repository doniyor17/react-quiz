import Footer from "./layout/Footer.jsx";
import Timer from "./Timer.jsx";
import Options from "./Options.jsx";
import { useQuiz } from "../context/QuizContext.jsx";
function Questions() {
  const { questions, answer, dispatch, index, numQuestions, secondsRemaining } =
    useQuiz();
  return (
    <div>
      <h2>{questions[index].question}</h2>
      <Options question={questions[index]} />
      <Footer>
        {answer !== null &&
          (index < numQuestions - 1 ? (
            <button
              className={`btn btn-ui`}
              onClick={() => {
                dispatch({ type: "next" });
              }}
            >
              Next
            </button>
          ) : (
            <button
              className={`btn btn-ui`}
              onClick={() => {
                dispatch({ type: "finish" });
              }}
            >
              Finish
            </button>
          ))}
        <Timer
          dispatch={dispatch}
          secondsRemaining={secondsRemaining}
        />
      </Footer>
    </div>
  );
}

export default Questions;
