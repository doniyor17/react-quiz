import Header from "./layout/Header.jsx";
import Main from "./layout/Main.jsx";
import Question from "./Question.jsx";
import Loader from "./base/Loader.jsx";
import Error from "./base/Error.jsx";
import Progress from "./Progress.jsx";

import StartScreen from "./layout/StartScreen.jsx";
import FinishScreen from "./FinishScreen.jsx";
import { useQuiz } from "../context/QuizContext.jsx";

function App() {
  const { status, error, questions } = useQuiz();

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

        {status === "ready" && <StartScreen />}

        {status === "active" && (
          <>
            <Progress />
            <Question />
          </>
        )}

        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
