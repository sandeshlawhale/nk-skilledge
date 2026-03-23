const { Router } = require("express");
const {
  createInquiry,
  getAllInquiries,
  deleteInquiry,
} = require("../controllers/serviceInquiry.controller");
const { verifyJWT, authorizeRoles } = require("../middleware/auth.middleware");

const router = Router();

router.route("/inquiry").post(createInquiry);

// Secured admin routes
router.use(verifyJWT);
router.use(authorizeRoles("admin"));

router.route("/inquiries").get(getAllInquiries);
router.route("/inquiry/:id").delete(deleteInquiry);

module.exports = router;
