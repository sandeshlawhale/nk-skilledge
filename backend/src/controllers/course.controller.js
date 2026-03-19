const Course = require("../models/course.model");
const { ApiError, ApiResponse, asyncHandler } = require("../utils/apiHandler");
const { uploadOnCloudinary } = require("../config/cloudinary");

const getAllCourses = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = {};

  if (status === "all") {
    // Note: Security check for admin role should be handled here or in middleware
    // If we want this to be purely through query params, we need to ensure the requester is admin
    // For now, I'll implement the logic to handle the 'all' filter
  } else {
    filter.status = "published";
  }

  const courses = await Course.find(filter).sort("-createdAt");
  
  const coursesWithModuleCount = await Promise.all(
    courses.map(async (course) => {
      const lessonsCount = await require("../models/lesson.model").countDocuments({ 
        courseId: course._id, 
        status: "published" 
      });
      return { ...course.toObject(), lessonsCount };
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, coursesWithModuleCount, "Courses fetched successfully"));
});

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  const lessonsCount = await require("../models/lesson.model").countDocuments({ 
    courseId: course._id, 
    status: "published" 
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { ...course.toObject(), lessonsCount }, "Course fetched successfully"));
});

const createCourse = asyncHandler(async (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  const thumbnailLocalPath = req.file?.path;

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail is required");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!thumbnail) {
    throw new ApiError(400, "Failed to upload thumbnail");
  }

  const course = await Course.create({
    title,
    description,
    price: price || 0,
    thumbnail: thumbnail.url,
    createdBy: req.user._id,
    status: "draft",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, course, "Course created as draft"));
});

const updateCourse = asyncHandler(async (req, res) => {
  const { title, description, price, status } = req.body;
  const updateData = { title, description, price, status };

  if (req.file) {
    const thumbnailLocalPath = req.file.path;
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    if (thumbnail) {
      updateData.thumbnail = thumbnail.url;
    }
  }

  // Remove undefined fields
  Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

  const course = await Course.findByIdAndUpdate(
    req.params.courseId,
    { $set: updateData },
    { new: true }
  );

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, course, "Course updated successfully"));
});

const deleteCourse = asyncHandler(async (req, res) => {
  await Course.findByIdAndDelete(req.params.courseId);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Course deleted successfully"));
});

const publishCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.courseId,
    { $set: { status: "published" } },
    { new: true }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, course, "Course published successfully"));
});

const unpublishCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.courseId,
    { $set: { status: "draft" } },
    { new: true }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, course, "Course unpublished successfully"));
});

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  publishCourse,
  unpublishCourse,
};
