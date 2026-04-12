const { Router } = require("express");
const { handleContactFormSubmission } = require("../controllers/contact.controller");

const router = Router();

// Route: POST /api/v1/contact
router.route("/").post(handleContactFormSubmission);

module.exports = router;
