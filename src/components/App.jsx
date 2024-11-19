import Header from "./base/Header.jsx";
import Main from "./Main.jsx";
import Question from "./Question.jsx";
import Loader from "./base/Loader.jsx";
import Error from "./base/Error.jsx";
import Progress from "./Progress.jsx";

import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen.jsx";
import FinishScreen from "./FinishScreen.jsx";

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  error: null,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 10,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        status: "loading",
      };
    case "error":
      return {
        ...state,
        status: "error",
        error: action.error,
      };
    case "dateFetched":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "start":
      return {
        ...state,
        status: "active",
        highscore:
          state.points > state.highscore ? state.highscore : state.points,
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === state.questions.at(state.index).correctOption
            ? state.points + state.questions.at(state.index).points
            : state.points,
      };
    case "next":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action called!");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    error,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchQuestions() {
      dispatch({ type: "loading" });

      try {
        const response = await fetch("http://localhost:3001/questions", {
          signal: controller.signal,
        });
        const data = await response.json();

        dispatch({
          type: "dateFetched",
          payload: data,
          status: "ready",
          error: null,
        });
      } catch (error) {
        switch (error.name) {
          case "AbortError":
            return;

          case "SyntaxError":
            return dispatch({
              type: "error",
              error: "Data is not valid for this endpoint.",
            });

          default:
            dispatch({
              type: "error",
              error: "Couldn't fetch data.",
            });
        }

        if (error.name === "AbortError") return;
        dispatch({
          type: "error",
          error: error.message,
        });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && status !== "loading" && (
          <Error message={error} />
        )}

        {status !== "loading" && status !== "error" && !questions.length && (
          <p className="no-questions">No questions yet.</p>
        )}

        {state.status === "ready" && (
          <StartScreen
            num={numQuestions}
            dispatch={dispatch}
          />
        )}

        {state.status === "active" && (
          <>
            <Progress
              index={index}
              points={points}
              numQuestions={numQuestions}
              maxPoints={maxPoints}
            />
            <Question
              question={questions[index]}
              answer={answer}
              points={points}
              index={index}
              numQuestions={numQuestions}
              dispatch={dispatch}
              secondsRemaining={secondsRemaining}
            />
          </>
        )}

        {state.status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
