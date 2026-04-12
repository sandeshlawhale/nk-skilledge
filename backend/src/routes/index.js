const { Router } = require("express");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const courseRouter = require("./course.routes");
const lessonRouter = require("./lesson.routes");
const taskRouter = require("./task.routes");
const enrollmentRouter = require("./enrollment.routes");
const progressRouter = require("./progress.routes");
const serviceInquiryRouter = require("./serviceInquiry.routes");
const serviceCatalogRouter = require("./service.routes");
const memberRouter = require("./member.routes");
const contactRouter = require("./contact.routes");


const router = Router();

router.get("/", (req, res) => {
    res.send("NK SKILLEDGE V1 ROUTES API IS WORKING!");
});

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/courses", courseRouter);
router.use("/lessons", lessonRouter);
router.use("/tasks", taskRouter);
router.use("/enrollments", enrollmentRouter);
router.use("/progress", progressRouter);
router.use("/service-inquiries", serviceInquiryRouter);
router.use("/services", serviceCatalogRouter);
router.use("/members", memberRouter);
router.use("/contact", contactRouter);


module.exports = router;
