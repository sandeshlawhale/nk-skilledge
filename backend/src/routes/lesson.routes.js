const { Router } = require("express");
const {
  getAllLessonsForCourse,
  getLessonById,
  createLesson,
  updateLesson,
  updateLessonStatus,
  deleteLesson,
} = require("../controllers/lesson.controller");
const { verifyJWT, authorizeRoles } = require("../middleware/auth.middleware");

const router = Router();

router.route("/course/:courseId").get(getAllLessonsForCourse);
router.route("/:lessonId").get(getLessonById);

// Secured admin routes
router.route("/").post(verifyJWT, authorizeRoles("admin"), createLesson);
router.route("/:lessonId").put(verifyJWT, authorizeRoles("admin"), updateLesson).patch(verifyJWT, authorizeRoles("admin"), updateLessonStatus).delete(verifyJWT, authorizeRoles("admin"), deleteLesson);

module.exports = router;
