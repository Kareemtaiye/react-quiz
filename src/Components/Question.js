import Options from "./Options";
import Progress from "./Progress";

function Question({
  question,
  dispatch,
  answer,
  index,
  numQuestions,
  maxPoints,
  points,
}) {
  return (
    <div>
      <Progress
        maxPoints={maxPoints}
        points={points}
        answer={answer}
        index={index}
        numQuestions={numQuestions}
      />
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
    // question
  );
}

export default Question;
