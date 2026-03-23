const { Router } = require("express");
const {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole,
} = require("../controllers/user.controller");
const { verifyJWT, authorizeRoles } = require("../middleware/auth.middleware");

const router = Router();

router.use(verifyJWT);
router.use(authorizeRoles("admin"));

router.route("/").get(getAllUsers);
router.route("/:userId").get(getUserById).delete(deleteUser).put(updateUserRole);

module.exports = router;
