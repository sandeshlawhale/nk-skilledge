const Progress = require("../models/progress.model");
const Enrollment = require("../models/enrollment.model");
const Lesson = require("../models/lesson.model");
const Task = require("../models/task.model");
const { ApiResponse, asyncHandler } = require("../utils/apiHandler");

// Helper to update enrollment progress percentage
const updateEnrollmentProgress = async (userId, courseId) => {
  try {
    // 1. Get total completable items
    const [publishedLessons, totalTasks] = await Promise.all([
      Lesson.find({ courseId, status: "published" }),
      Task.find({ courseId })
    ]);

    // Total Items = Every published lesson with a videoUrl has a video (1) + every task
    const videoItemsCount = publishedLessons.filter(l => !!l.videoUrl).length;
    const totalItems = videoItemsCount + totalTasks.length;
    
    if (totalItems === 0) return;

    // 2. Get completed items for this user. 
    // We only count completions that correspond to current completable items.
    const progressRecords = await Progress.find({
      userId,
      courseId,
      completed: true
    });

    let completedItemsCount = 0;
    for (const p of progressRecords) {
      if (p.type === 'task') {
        // Count if task still exists
        if (totalTasks.some(t => t._id.equals(p.taskId))) {
          completedItemsCount++;
        }
      } else if (p.type === 'video') {
        // Count if videoUrl still exists on that lesson
        const lesson = publishedLessons.find(l => l._id.equals(p.lessonId));
        if (lesson && lesson.videoUrl) {
          completedItemsCount++;
        }
      }
    }

    const progressPercentage = Math.round((completedItemsCount / totalItems) * 100);

    // 3. Update Enrollment
    await Enrollment.findOneAndUpdate(
      { userId, courseId },
      { 
        $set: { 
          progress: Math.min(progressPercentage, 100),
          completedAt: progressPercentage >= 100 ? new Date() : null
        } 
      }
    );
  } catch (error) {
    console.error("Error updating enrollment progress:", error);
  }
};

const completeTask = asyncHandler(async (req, res) => {
  const { courseId, lessonId, taskId, type, answer, completed } = req.body;
  const userId = req.user._id;

  // Use type (video/task) to distinguish. If video, taskId is ignored for uniqueness.
  const query = type === "video" 
    ? { userId, courseId, lessonId, type: "video" }
    : { userId, courseId, lessonId, taskId, type: "task" };

  const progressData = {
    answer,
    completed: completed ?? true,
    completedAt: (completed ?? true) ? new Date() : null
  };

  const progress = await Progress.findOneAndUpdate(
    query,
    { $set: progressData },
    { upsert: true, new: true }
  );

  // Trigger background update of overall progress
  await updateEnrollmentProgress(userId, courseId);

  return res
    .status(200)
    .json(new ApiResponse(200, progress, "Progress updated successfully"));
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
