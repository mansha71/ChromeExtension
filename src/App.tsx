import React, { useState } from "react";
import "./app.css";

function App() {
  const [habits, setHabits] = useState<string[]>([]); // Specify string[] type
  const [habitInput, setHabitInput] = useState<string>(""); // Specify string type

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Specify ChangeEvent type
    setHabitInput(event.target.value);
  };

  const handleAddHabit = (event: React.FormEvent<HTMLFormElement>) => {
    // Specify FormEvent type
    event.preventDefault();
    if (habitInput.trim() !== "") {
      setHabits([...habits, habitInput.trim()]);
      setHabitInput("");
    }
  };

  const handleDeleteTask = (index: number) => {
    setHabits((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1); // Remove the task at the specified index
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
      <div>
        {habits.map((habit, index) => (
          <div key={index}>
            <div className="habitName">{habit} :</div>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((number) => (
              <React.Fragment key={number}>
                <label htmlFor={`habit-${index}-checkbox-${number}`}>
                  {number}
                </label>
                <input
                  type="checkbox"
                  id={`habit-${index}-checkbox-${number}`}
                />
              </React.Fragment>
            ))}
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteTask(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
