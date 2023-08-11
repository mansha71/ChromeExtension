import React, { useState, useEffect } from "react";
import "./app.css";

function App() {
  const [habits, setHabits] = useState<string[]>([]);
  const [habitInput, setHabitInput] = useState<string>("");
  const [checkboxStatus, setCheckboxStatus] = useState<boolean[][]>([]);
  const [streaks, setStreaks] = useState<number[]>(
    Array(habits.length).fill(0)
  );

  const currentDate = new Date();
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  let diffMonth = false;

  console.log(checkboxStatus);

  useEffect(() => {
    diffMonth = false;
    const storedMonth = localStorage.getItem("currentMonth");
    const currentMonth = currentDate.getMonth();

    if (storedMonth && parseInt(storedMonth) !== currentMonth) {
      // Month has changed, update the stored month and continue streaks
      diffMonth = true;
      localStorage.setItem("currentMonth", currentMonth.toString());

      for (let i = 0; i <= habitInput.length; i++) {
        handleResetTask(i);
      }
      setStreaks((prevState) => {
        const newStreaks = prevState.map((streak) =>
          streak > 0 ? streak + 1 : 0
        );
        return newStreaks;
      });
    }
  }, [currentDate]);

  //because useEffect has empty [] at the end, it exectues once when component is first shown
  useEffect(() => {
    // gets previously saved habits from storage and sets it to storedHabits
    const storedHabits = localStorage.getItem("habits");
    const storedCheckbox = localStorage.getItem("checkboxs");
    const storedStreaks = localStorage.getItem("streaks");
    //if there are habits
    if (storedHabits) {
      //sets the habit array to the storedHabits
      setHabits(JSON.parse(storedHabits));
    }
    if (storedCheckbox) {
      setCheckboxStatus(JSON.parse(storedCheckbox));
    }
    if (storedStreaks) {
      setStreaks(JSON.parse(storedStreaks));
    }
  }, []);

  //this useeffect has a dependency on [habits] so it runs whenever the variable changes
  useEffect(() => {
    // Save habits to local storage whenever habits change
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    // Save habits to local storage whenever habits change
    localStorage.setItem("checkboxs", JSON.stringify(checkboxStatus));
  }, [checkboxStatus]);

  useEffect(() => {
    // Save habits to local storage whenever habits change
    localStorage.setItem("streaks", JSON.stringify(streaks));
  }, [streaks]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHabitInput(event.target.value);
  };

  const handleAddHabit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (habitInput.trim() !== "") {
      setHabits([...habits, habitInput.trim()]);
      // Initialize a new checkbox status array with false values for each day
      const newCheckboxStatus = new Array(daysInMonth).fill(false);

      // Append the new checkbox status array to the existing checkboxStatus array
      setCheckboxStatus([...checkboxStatus, newCheckboxStatus]);
      setHabitInput("");
    }
  };

  const handleCheckboxChange = (index: number, number: number) => {
    setCheckboxStatus((prevState) => {
      const newState = [...prevState];
      newState[index][number] = !newState[index][number]; // Toggle the checkbox status
      return newState;
    });

    //changing streak
    setStreaks((prevState) => {
      const newState = [...prevState];
      let count = 0;
      if (diffMonth) {
        count = newState[index];
      }

      // Starting from the clicked checkbox's previous day
      for (let i = number - 1; i >= 0; i--) {
        if (checkboxStatus[index][i] == true) {
          count++;
        } else {
          break; // Streak is broken
        }
      }

      newState[index] = count + 1; // Increment streak by 1 (including the clicked day)
      return newState;
    });
  };

  const handleDeleteTask = (index: number) => {
    setHabits((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
    setCheckboxStatus((prevCheckboxStatus) => {
      const updatedCheckboxStatus = [...prevCheckboxStatus];
      updatedCheckboxStatus.splice(index, 1); // Remove the corresponding checkbox status
      return updatedCheckboxStatus;
    });
  };

  const handleResetTask = (index: number) => {
    setCheckboxStatus((prevCheckboxStatus) => {
      const updatedCheckboxStatus = [...prevCheckboxStatus];
      for (let i = 0; i <= 30; i++) {
        updatedCheckboxStatus[index][i] = false;
      }
      return updatedCheckboxStatus;
    });

    setStreaks((prevState) => {
      const newState = [...prevState];
      newState[index] = 0;
      return newState;
    });
  };

  return (
    <div className="app">
      <div className="h1div">
        <h1>HABIT SPARK</h1>
      </div>
      <h3>Enter New Habit:</h3>
      <form onSubmit={handleAddHabit}>
        <label htmlFor="taskInput"></label>
        <input
          type="text"
          placeholder="Task"
          value={habitInput}
          onChange={handleInputChange}
        />
        <button className="add-button" type="submit">
          Add
        </button>
      </form>
      <div className="maindiv">
        {habits.map((habit, index) => (
          <div key={index} className="habit-row">
            <div className="habitName">{habit} :</div>
            <div className="streak">Streak: {streaks[index]}</div>
            <div className="number-checkbox-container">
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                (number) => (
                  <div key={number} className="number-checkbox">
                    <label htmlFor={`habit-${index}-checkbox-${number}`}>
                      {number}
                    </label>
                    <input
                      type="checkbox"
                      id={`habit-${index}-checkbox-${number}`}
                      checked={checkboxStatus[index][number - 1]}
                      onChange={() => handleCheckboxChange(index, number - 1)}
                    />
                  </div>
                )
              )}
            </div>
            <button
              className="other-button"
              onClick={() => handleDeleteTask(index)}
            >
              Delete
            </button>
            <button
              className="other-button"
              onClick={() => handleResetTask(index)}
            >
              Reset
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
