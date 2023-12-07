import { useEffect, useState } from "react";
import "./App.css";

import axios from "axios";
import { TaskProvider } from "./contexts";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prev) => [{ _id: Date.now(), ...task }, ...prev]);
  };

  const updateTask = (id, task) => {
    setTasks((prev) =>
      prev.map((prevTask) => (prevTask.id === id ? task : prevTask))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const getTasks = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/v1/gettasks`);
      if (data) {
        setTasks(data);
      } else {
        console.error("Error deleting task:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskProvider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        setTasks,
      }}
    >
      <div className="bg-[#172842] h-auto ">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Task
          </h1>
          <div className="mb-4">
            <TaskForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {tasks.map((task) => (
              <dir key={task.id} className="w-full">
                <TaskItem task={task} />
              </dir>
            ))}
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
