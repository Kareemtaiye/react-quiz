import React from "react";

function FinishedScreen({ points, maxPoints, dispatch }) {
  const percentage = Math.ceil((points / maxPoints) * 100);
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong>/{maxPoints} Points ({percentage}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishedScreen;
