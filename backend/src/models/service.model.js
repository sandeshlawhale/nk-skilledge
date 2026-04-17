const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    logo: {
      type: String, // cloudinary url
    },
    icon: {
      type: String, // icon name (e.g. globe, mobile, megaphone)
      default: "globe",
    },
    coverImage: {
      type: String, // cloudinary url
    },
    price: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ["development", "design", "digital_marketing", "other"],
      default: "other",
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    whatItProvides: [
      {
        type: String,
      },
    ],
    features: [
      {
        type: String,
      },
    ],
    technologies: [
      {
        type: String,
      },
    ],
    process: [
      {
        type: String,
      },
    ],
    faq: [
      {
        question: {
          type: String,
        },
        answer: {
          type: String,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
