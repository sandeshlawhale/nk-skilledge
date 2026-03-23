const Task = require("../models/task.model");
const { ApiError, ApiResponse, asyncHandler } = require("../utils/apiHandler");

const getTasksByLesson = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ lessonId: req.params.lessonId });
  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.taskId);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task fetched successfully"));
});

const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.taskId,
    { $set: req.body },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  await Task.findByIdAndDelete(req.params.taskId);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully"));
});

module.exports = {
  getTasksByLesson,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
