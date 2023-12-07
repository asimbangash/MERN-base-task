import React, { useState } from "react";
import { useTask } from "../contexts";

const TaskForm = () => {
  const [task, setTask] = useState("");
  const { addTask } = useTask();

  const add = async (e) => {
    e.preventDefault();
    if (!task) return;
    try {
      const response = await fetch("http://localhost:8000/api/v1/addtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: task }),
      });

      if (response.ok) {
        const newTask = await response.json();
        addTask(newTask);
        setTask("");
      } else {
        console.error("Error adding task:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Task..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;
