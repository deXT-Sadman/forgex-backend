const Task = require("../models/Task");
const User = require("../models/User");

// Get all tasks for the authenticated user
const getAllTasks = async (req, res, next) => {
  const userId = req.user.id;
  const tasks = await Task.find({ userId });

  res.status(200).json({ success: true, data: { tasks } });
};

// Get a specific task by ID for the authenticated user
const getTaskById = async (req, res, next) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  const task = await Task.findOne({ _id: taskId, userId });

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.status(200).json({ success: true, data: { task } });
};

// Create a new task for the authenticated user
const createTask = async (req, res, next) => {
  const userId = req.user.id;

  const newTask = new Task({
    localId: await Task.generateLocalId(),
    userId,
    ...req.body,
  });

  await newTask.save();

  res.status(201).json({ success: true, data: { task: newTask } });
};

// Update a specific task by ID for the authenticated user
const updateTask = async (req, res, next) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    req.body,
    { new: true },
  );

  if (!updatedTask) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.status(200).json({ success: true, data: { task: updatedTask } });
};

// Delete a specific task by ID for the authenticated user
const deleteTask = async (req, res, next) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });

  if (!deletedTask) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.status(200).json({ success: true, message: "Task deleted successfully" });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
