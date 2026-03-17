const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    taskType: {
      type: String,
      enum: ["mcq", "coding", "assignment"],
      required: true,
    },
    starterCode: {
      type: String,
    },
    language: {
      type: String,
    },
    options: [
      {
        type: String, // for MCQ
      },
    ],
    correctAnswer: {
      type: String,
    },
    testCases: [
      {
        input: String,
        expectedOutput: String,
        isHidden: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
