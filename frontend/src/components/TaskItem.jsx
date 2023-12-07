import React, { useState } from "react";
import { useTask } from "../contexts";

const TaskItem = ({ task }) => {
  const [isTaskEditable, setIsTaskEditable] = useState(false);
  const [taskMsg, setTaskMsg] = useState(task.title);
  const { updateTask, deleteTask } = useTask();

  const editTask = async () => {
    try {
      if (!task._id) {
        console.error("Error updating task: task._id is undefined");
        return;
      }

      const response = await fetch(
        `http://localhost:8000/api/v1/updateTask/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: taskMsg }),
        }
      );

      if (response.ok) {
        updateTask(task._id, { ...task, task: taskMsg });
        setIsTaskEditable(false);
      } else {
        console.error("Error updating task:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const removeTask = async () => {
    try {
      deleteTask(task._id);
      const response = await fetch(
        `http://localhost:8000/api/v1/deleteTask/${task._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        deleteTask(task._id);

        const tasks = JSON.parse(localStorage.getItem("tasks"));
        const updatedtasks = tasks.filter((i) => i._id !== task._id);
        localStorage.setItem("tasks", JSON.stringify(updatedtasks));
      } else {
        console.error("Error deleting task:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        task.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTaskEditable ? "border-black/10 px-2" : "border-transparent"
        } ${task.completed ? "line-through" : ""}`}
        value={taskMsg}
        onChange={(e) => setTaskMsg(e.target.value)}
        readOnly={!isTaskEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (task.completed) return;

          if (isTaskEditable) {
            editTask();
          } else setIsTaskEditable((prev) => !prev);
        }}
        disabled={task.completed}
      >
        {isTaskEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => removeTask()}
      >
        ❌
      </button>
    </div>
  );
};

export default TaskItem;
