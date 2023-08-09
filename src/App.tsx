import React, { useState } from "react";
import "./app.css";

function App() {
  const [habits, setHabits] = useState<string[]>([]);
  const [habitInput, setHabitInput] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHabitInput(event.target.value);
  };

  const handleAddHabit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (habitInput.trim() !== "") {
      setHabits([...habits, habitInput.trim()]);
      setHabitInput("");
    }
  };

  const handleDeleteTask = (index: number) => {
    setHabits((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  };

  return (
    <div className="app">
      <h1>Habit Tracker</h1>
      <h3>Enter New Habit:</h3>
      <form onSubmit={handleAddHabit}>
        <label htmlFor="taskInput"></label>
        <input type="text" value={habitInput} onChange={handleInputChange} />
        <button className="btn" type="submit">
          Add
        </button>
      </form>
      // ...existing code...
      <div>
        {habits.map((habit, index) => (
          <div key={index} className="habit-row">
            <div className="habitName">{habit} :</div>
            <div className="number-checkbox-container">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((number) => (
                <div key={number} className="number-checkbox">
                  <label htmlFor={`habit-${index}-checkbox-${number}`}>
                    {number}
                  </label>
                  <input
                    type="checkbox"
                    id={`habit-${index}-checkbox-${number}`}
                  />
                </div>
              ))}
            </div>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteTask(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      // ...existing code...
    </div>
  );
}

export default App;
