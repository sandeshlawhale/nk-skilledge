const Enrollment = require("../models/enrollment.model");
const Course = require("../models/course.model");
const Lesson = require("../models/lesson.model");
const { ApiError, ApiResponse, asyncHandler } = require("../utils/apiHandler");

const enrollUser = asyncHandler(async (req, res) => {
  const { userId, courseId, accessType, expiresAt } = req.body;

  const existedEnrollment = await Enrollment.findOne({ userId, courseId });
  if (existedEnrollment) {
    throw new ApiError(409, "User already enrolled in this course");
  }

  const enrollment = await Enrollment.create({
    userId,
    courseId,
    accessType: accessType || "lifetime",
    expiresAt,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, enrollment, "Enrolled successfully"));
});

const getUserEnrollments = asyncHandler(async (req, res) => {
  const { search, category, levels } = req.query;
  const userId = req.params.userId;

  // 1. Fetch user's enrollments with course details
  // Note: We don't filter by "published" here because if a user is enrolled, 
  // they should have access regardless of current catalog status.
  const enrollments = await Enrollment.find({ userId }).populate("courseId");

  // 2. Filter enrollments by search, category, and level in memory
  const filteredEnrollments = enrollments.filter(enrollment => {
    if (!enrollment.courseId) return false;
    
    const course = enrollment.courseId;
    
    const matchesCategory = !category || category === "All" || course.category === category;
    const matchesLevel = !levels || levels === "All" || course.levels === levels;
    const matchesSearch = !search || 
      course.title.toLowerCase().includes(search.toLowerCase()) || 
      (course.category && course.category.toLowerCase().includes(search.toLowerCase()));

    return matchesCategory && matchesLevel && matchesSearch;
  });

  // 3. Add lessonsCount to each enrollment
  const enrollmentsWithCount = await Promise.all(
    filteredEnrollments.map(async (enrollment) => {
      const eObj = enrollment.toObject();
      if (eObj.courseId) {
        eObj.courseId.lessonsCount = await Lesson.countDocuments({ 
          courseId: eObj.courseId._id, 
          status: "published" 
        });
      }
      return eObj;
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, enrollmentsWithCount, "Enrollments fetched successfully"));
});

const getCourseEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({ courseId: req.params.courseId }).populate("userId");
  return res
    .status(200)
    .json(new ApiResponse(200, enrollments, "Enrollments fetched successfully"));
});

const unenrollUser = asyncHandler(async (req, res) => {
  await Enrollment.findByIdAndDelete(req.params.enrollmentId);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Unenrolled successfully"));
});

module.exports = {
  enrollUser,
  getUserEnrollments,
  getCourseEnrollments,
  unenrollUser,
};
