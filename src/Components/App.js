import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import StartQuestions from "./StartQuestions";
import NextQuestion from "./NextQuestion";

const initialState = {
  questions: [],

  //loading, error, ready, active, completed
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "dataReady":
      return { ...state, questions: payload, status: "ready" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const currQuestion = state.questions.at(state.index);

      return {
        ...state,
        answer: payload,
        points:
          currQuestion.correctOption === payload
            ? state.points + currQuestion.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReady", payload: data }))
      .catch((err) => {
        dispatch({ type: "dataFailed" });
        console.log(err);
      });
  }, []);

  console.log(questions);
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartQuestions dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            answer={answer}
            dispatch={dispatch}
            maxPoints={maxPoints}
            numQuestions={numQuestions}
            index={index}
            points={points}
          />
        )}
        <NextQuestion dispatch={dispatch} answer={answer} />
      </Main>
    </div>
  );
}

export default App;
