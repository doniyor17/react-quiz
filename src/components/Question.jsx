/* eslint-disable react/prop-types */
import Footer from "./layout/Footer.jsx";
import Timer from "./Timer.jsx";
import Options from "./Options.jsx";
function Questions({
  question,
  answer,
  dispatch,
  index,
  numQuestions,
  secondsRemaining,
}) {
  return (
    <div>
      <h2>{question.question}</h2>
      <Options
        question={question}
        answer={answer}
        dispatch={dispatch}
      />
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
