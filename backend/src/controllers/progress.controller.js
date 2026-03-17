const Progress = require("../models/progress.model");
const { ApiResponse, asyncHandler } = require("../utils/apiHandler");

const completeTask = asyncHandler(async (req, res) => {
  const { courseId, lessonId, taskId } = req.body;
  const userId = req.user._id;

  const progress = await Progress.findOneAndUpdate(
    { userId, courseId, lessonId, taskId },
    { $set: { completed: true, completedAt: new Date() } },
    { upsert: true, new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, progress, "Task marked as completed"));
});

const getUserCourseProgress = asyncHandler(async (req, res) => {
  const { userId, courseId } = req.params;
  const progress = await Progress.find({ userId, courseId });
  return res
    .status(200)
    .json(new ApiResponse(200, progress, "Progress fetched successfully"));
});

module.exports = {
  completeTask,
  getUserCourseProgress,
};
