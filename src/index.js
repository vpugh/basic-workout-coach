import React from "react";
import ReactDOM from "react-dom";
import Main from "./main";

import "./styles.css";

// Inspired by Noom Coach, a way of keeping yourself accountable
// Exercises, what type, length, and frequency.
// Types: weight training, flexibility, walking, pool, etc.
// Length: how long will the activity be done for.
// Frequency: how often will this occur within a week's time

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
