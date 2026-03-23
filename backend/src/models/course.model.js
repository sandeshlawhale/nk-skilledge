const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: [
      {
        type: String,
        required: true,
      },
    ],
    thumbnail: {
      type: String, // cloudinary url
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      trim: true,
    },
    levels: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    duration: {
      type: String, // e.g. "5 hours", "3 weeks"
    },
    instructorName: {
      type: String,
    },
    whatYouWillLearn: [
      {
        type: String,
      },
    ],
    requirements: [
      {
        type: String,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
