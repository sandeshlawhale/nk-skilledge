const { Router } = require("express");
const {
  getTasksByLesson,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const { verifyJWT, authorizeRoles } = require("../middleware/auth.middleware");

const router = Router();

router.route("/lesson/:lessonId").get(getTasksByLesson);
router.route("/:taskId").get(getTaskById);

// Secured admin routes
router.route("/").post(verifyJWT, authorizeRoles("admin"), createTask);
router.route("/:taskId").put(verifyJWT, authorizeRoles("admin"), updateTask).delete(verifyJWT, authorizeRoles("admin"), deleteTask);

module.exports = router;
