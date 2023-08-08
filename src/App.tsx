import React, { useState } from "react";
import "./app.css";

function App() {
  const [habbits, setHabits] = useState([]);

  return (
    <div className="app">
      <h1>Hello World</h1>
      <h3>Enter New Habbit:</h3>
      <form action="taskInput">
        <label htmlFor="taskInput"></label>
        <input type="text" name="" id="taskentry" />
        <button className="btn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default App;
