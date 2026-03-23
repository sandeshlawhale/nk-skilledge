const { Router } = require("express");
const {
  completeTask,
  getUserCourseProgress,
} = require("../controllers/progress.controller");
const { verifyJWT } = require("../middleware/auth.middleware");

const router = Router();

router.use(verifyJWT);

router.route("/complete-task").post(completeTask);
router.route("/user/:userId/course/:courseId").get(getUserCourseProgress);

module.exports = router;
