const { Router } = require("express");
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/service.controller");
const { verifyJWT, authorizeRoles } = require("../middleware/auth.middleware");
const multer = require("multer");
const os = require("os");
const upload = multer({ dest: os.tmpdir() });

const router = Router();

router.route("/").get(getAllServices);
router.route("/:serviceId").get(getServiceById);

// Secured admin routes
router.route("/").post(verifyJWT, authorizeRoles("admin"), createService);
router.route("/:serviceId")
  .put(
    verifyJWT, 
    authorizeRoles("admin"), 
    upload.fields([
      { name: "logo", maxCount: 1 },
      { name: "coverImage", maxCount: 1 }
    ]), 
    updateService
  )
  .delete(verifyJWT, authorizeRoles("admin"), deleteService);

module.exports = router;
