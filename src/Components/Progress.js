import React from "react";

function Progress({ answer, numQuestions, index, maxPoints, points }) {
  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints} Points
      </p>
    </div>
  );
}

export default Progress;
