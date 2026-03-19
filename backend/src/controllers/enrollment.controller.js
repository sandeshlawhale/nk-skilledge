const Enrollment = require("../models/enrollment.model");
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
  const enrollments = await Enrollment.find({ userId: req.params.userId }).populate("courseId");
  
  const enrollmentsWithCount = await Promise.all(
    enrollments
      .filter(enrollment => enrollment.courseId && enrollment.courseId.status === "published")
      .map(async (enrollment) => {
        const eObj = enrollment.toObject();
        if (eObj.courseId) {
          eObj.courseId.lessonsCount = await require("../models/lesson.model").countDocuments({ 
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
