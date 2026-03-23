const Course = require("../models/course.model");
const { ApiError, ApiResponse, asyncHandler } = require("../utils/apiHandler");
const { uploadOnCloudinary } = require("../config/cloudinary");

const getAllCourses = asyncHandler(async (req, res) => {
  const { status, search, category, levels, featured, limit } = req.query;
  const filter = {};

  // Status filter
  if (status !== "all") {
    filter.status = "published";
  }

  // Category filter
  if (category && category !== "All") {
    filter.category = category;
  }

  // Levels filter
  if (levels && levels !== "All") {
    filter.levels = levels;
  }

  // Search filter
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } }
    ];
  }

  // Featured filter
  if (featured === "true") {
    filter.featured = true;
  } else if (featured === "false") {
    filter.featured = false;
  }

  let query = Course.find(filter).sort("-createdAt");

  // Limit results
  if (limit) {
    query = query.limit(parseInt(limit));
  }

  const courses = await query;
  
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
  const { 
    title, 
    price, 
    category, 
    levels, 
    duration, 
    instructorName, 
    featured,
  } = req.body;

  // Handle arrays from FormData which might have [] suffix
  const tags = req.body.tags || req.body['tags[]'] || [];
  const whatYouWillLearn = req.body.whatYouWillLearn || req.body['whatYouWillLearn[]'] || [];
  const requirements = req.body.requirements || req.body['requirements[]'] || [];
  const description = req.body.description || req.body['description[]'] || [];

  if (!title || (Array.isArray(description) ? description.length === 0 : !description)) {
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

  const parsedPrice = Number(price) || 0;
  const isFree = parsedPrice === 0;

  const course = await Course.create({
    title,
    description: Array.isArray(description) ? description : (description ? [description] : []),
    price: parsedPrice,
    isFree,
    category,
    levels,
    tags: Array.isArray(tags) ? tags : (tags ? [tags] : []),
    duration,
    instructorName,
    whatYouWillLearn: Array.isArray(whatYouWillLearn) ? whatYouWillLearn : (whatYouWillLearn ? [whatYouWillLearn] : []),
    requirements: Array.isArray(requirements) ? requirements : (requirements ? [requirements] : []),
    thumbnail: thumbnail.url,
    createdBy: req.user._id,
    status: "draft",
    featured: featured === "true" || featured === true,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, course, "Course created as draft"));
});

const updateCourse = asyncHandler(async (req, res) => {
  const { 
    title, 
    price, 
    status,
    category,
    levels,
    duration,
    instructorName,
    featured,
  } = req.body;

  // Handle arrays from FormData
  const tagsUpdate = req.body.tags || req.body['tags[]'];
  const whatYouWillLearnUpdate = req.body.whatYouWillLearn || req.body['whatYouWillLearn[]'];
  const requirementsUpdate = req.body.requirements || req.body['requirements[]'];
  const descriptionUpdate = req.body.description || req.body['description[]'];

  const updateData = { 
    title, 
    description: descriptionUpdate !== undefined ? (Array.isArray(descriptionUpdate) ? descriptionUpdate : [descriptionUpdate]) : undefined, 
    price: price !== undefined ? Number(price) : undefined, 
    status,
    category,
    levels,
    tags: tagsUpdate !== undefined ? (Array.isArray(tagsUpdate) ? tagsUpdate : [tagsUpdate]) : undefined,
    duration,
    instructorName,
    whatYouWillLearn: whatYouWillLearnUpdate !== undefined ? (Array.isArray(whatYouWillLearnUpdate) ? whatYouWillLearnUpdate : [whatYouWillLearnUpdate]) : undefined,
    requirements: requirementsUpdate !== undefined ? (Array.isArray(requirementsUpdate) ? requirementsUpdate : [requirementsUpdate]) : undefined,
    featured: featured !== undefined ? (featured === "true" || featured === true) : undefined
  };

  // If price is updated, adjust isFree
  if (price !== undefined) {
    updateData.isFree = Number(price) === 0;
  }

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
