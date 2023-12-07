import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTask = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const task = new Task({ title });
  await task.save();
  res.json(task);
});

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const task = await Task.findByIdAndUpdate(id, { title }, { new: true });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json({ message: "Task deleted successfully" });
});

export { createTask, getTasks, updateTask, deleteTask };
