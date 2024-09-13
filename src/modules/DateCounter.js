import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, { type, payload }) {
  console.log(state.count, payload);
  switch (type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "defStep":
      return { ...state, step: payload };
    case "defCount":
      return { ...state, count: payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Something went very wrong");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;
  console.log(count);

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    dispatch({ type: "dec" });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "defCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "defStep", payload: Number(e.target.value) });

    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
