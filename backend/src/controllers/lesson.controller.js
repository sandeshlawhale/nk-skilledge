const Lesson = require("../models/lesson.model");
const { ApiError, ApiResponse, asyncHandler } = require("../utils/apiHandler");

const getAllLessonsForCourse = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find({ courseId: req.params.courseId, status: "published" }).sort("order");
  return res
    .status(200)
    .json(new ApiResponse(200, lessons, "Lessons fetched successfully"));
});

const getLessonById = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.lessonId);
  if (!lesson) {
    throw new ApiError(404, "Lesson not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, lesson, "Lesson fetched successfully"));
});

const createLesson = asyncHandler(async (req, res) => {
  const { title, courseId, order, content, videoUrl } = req.body;

  if (!title || !courseId || req.body.order === undefined) {
    throw new ApiError(400, "Title, courseId, and order are required");
  }

  const lesson = await Lesson.create({
    title,
    courseId,
    order,
    content,
    videoUrl,
    status: "draft",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, lesson, "Lesson created as draft"));
});

const updateLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findByIdAndUpdate(
    req.params.lessonId,
    { $set: req.body },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, lesson, "Lesson updated successfully"));
});

const deleteLesson = asyncHandler(async (req, res) => {
  await Lesson.findByIdAndDelete(req.params.lessonId);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Lesson deleted successfully"));
});

module.exports = {
  getAllLessonsForCourse,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
};
