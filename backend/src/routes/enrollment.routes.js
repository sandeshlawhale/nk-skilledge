const { Router } = require("express");
const {
  enrollUser,
  getUserEnrollments,
  getCourseEnrollments,
  unenrollUser,
} = require("../controllers/enrollment.controller");
const { verifyJWT, authorizeRoles } = require("../middleware/auth.middleware");

const router = Router();

router.use(verifyJWT);

router.route("/").post(enrollUser);
router.route("/user/:userId").get(getUserEnrollments);
router.route("/course/:courseId").get(authorizeRoles("admin"), getCourseEnrollments);
router.route("/:enrollmentId").delete(authorizeRoles("admin"), unenrollUser);

module.exports = router;
