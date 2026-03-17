const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    code: {
      type: String,
    },
    language: {
      type: String,
    },
    result: {
      type: Object, // result from judge0 or similar
    },
    passed: {
      type: Boolean,
      default: false,
    },
    executionTime: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);
