import React, { useEffect } from "react";

function Timer({ dispatch, secondsTimer }) {
  const hour = Math.floor(secondsTimer / 60);
  const secs = secondsTimer % 60;

  useEffect(
    function () {
      const start = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(start);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {hour < 10 && "0"}
      {hour}:{secs < 10 && "0"}
      {secs} remaining
    </div>
  );
}

export default Timer;
