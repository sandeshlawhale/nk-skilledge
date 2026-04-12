const { Router } = require("express");
const {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/member.controller");
const { verifyJWT, authorizeRoles } = require("../middleware/auth.middleware");
const multer = require("multer");
const os = require("os");
const upload = multer({ dest: os.tmpdir() });

const router = Router();

router.route("/").get(getAllMembers);
router.route("/:memberId").get(getMemberById);

// Secured admin routes
router.route("/").post(
  verifyJWT, 
  authorizeRoles("admin"), 
  upload.single("profileImage"), 
  createMember
);

router.route("/:memberId")
  .put(
    verifyJWT, 
    authorizeRoles("admin"), 
    upload.single("profileImage"), 
    updateMember
  )
  .delete(verifyJWT, authorizeRoles("admin"), deleteMember);

module.exports = router;
