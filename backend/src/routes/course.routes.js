const { Router } = require("express");
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  publishCourse,
  unpublishCourse,
} = require("../controllers/course.controller");
const { verifyJWT, authorizeRoles } = require("../middleware/auth.middleware");
const multer = require("multer");
const os = require("os");
const upload = multer({ dest: os.tmpdir() });


const router = Router();

router.route("/").get(getAllCourses);
router.route("/:courseId").get(getCourseById);

// Secured admin routes
router.route("/").post(verifyJWT, authorizeRoles("admin"), upload.single("thumbnail"), createCourse);
router.route("/:courseId").put(verifyJWT, authorizeRoles("admin"), upload.single("thumbnail"), updateCourse).delete(verifyJWT, authorizeRoles("admin"), deleteCourse);
router.route("/:courseId/publish").put(verifyJWT, authorizeRoles("admin"), publishCourse);
router.route("/:courseId/unpublish").put(verifyJWT, authorizeRoles("admin"), unpublishCourse);

module.exports = router;
